import { Component, computed, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ICreateTutor, IUpdateTutor } from "@domain/tutor/interfaces/tutor.interface";
import { TutorService } from "@domain/tutor/services/tutor.service";
import { ViaCepService } from "@domain/tutor/services/via-cep.service";
import { VBreadcrumbConfig } from "@libs/ui/components/breadcrumb/v-breadcrumb.component";
import { ButtonComponent } from "@libs/ui/components/button/button.component";
import { VCardComponent } from "@libs/ui/components/card/v-card.component";
import { VInputDirective } from "@libs/ui/components/input/v-input.directive";
import { VLabelComponent } from "@libs/ui/components/label/v-label.component";
import { PageHeaderComponent } from "src/app/shared/components/page-header/page-header.component";

@Component({
  selector: "app-tutor-form",
  imports: [ReactiveFormsModule, VInputDirective, ButtonComponent, PageHeaderComponent, VCardComponent, VLabelComponent],
  templateUrl: "./form-tutor.html"
})
export class TutorFormPage implements OnInit {
  private readonly tutorService = inject(TutorService);
  private readonly viaCepService = inject(ViaCepService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  id = signal<string | null>(null);
  isEditMode = computed(() => !!this.id());
  isLoading = this.tutorService.isLoading;

  title = computed(() => (this.isEditMode() ? "Editar Tutor" : "Criar Tutor"));
  subtitle = computed(() => (this.isEditMode() ? "Atualize as informações do tutor." : "Preencha o formulário abaixo para criar um novo tutor."));
  breadcrumb = computed<VBreadcrumbConfig>(() => ({
    separator: "arrow",
    items: [
      { label: "Home", path: "/" },
      { label: "Tutores", path: "/app/tutores" },
      { label: this.isEditMode() ? "Editar Tutor" : "Criar Tutor", path: "" }
    ]
  }));

  form = new FormGroup({
    fullName: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.email] }),
    cpf: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    whatsapp: new FormControl("", { nonNullable: true }),
    notes: new FormControl("", { nonNullable: true }),
    address: new FormGroup({
      zipCode: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
      street: new FormControl({ value: "", disabled: true }, { nonNullable: true, validators: [Validators.required] }),
      number: new FormControl({ value: "", disabled: true }, { nonNullable: true, validators: [Validators.required] }),
      complement: new FormControl({ value: "", disabled: true }, { nonNullable: true }),
      neighborhood: new FormControl({ value: "", disabled: true }, { nonNullable: true, validators: [Validators.required] }),
      city: new FormControl({ value: "", disabled: true }, { nonNullable: true, validators: [Validators.required] }),
      state: new FormControl({ value: "", disabled: true }, { nonNullable: true, validators: [Validators.required] })
    })
  });

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.id.set(id);
      this.loadTutor(id);
      this.form.controls.address.enable(); // Enable address fields in edit mode
    }
    this.setupZipCodeListener();
  }

  private setupZipCodeListener() {
    this.form.controls.address.controls.zipCode.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((zipCode) => {
      const cleanZip = zipCode.replace(/\D/g, "");
      if (cleanZip.length === 8) {
        this.searchAddress(cleanZip);
      }
    });
  }

  private searchAddress(zipCode: string) {
    const addressControls = this.form.controls.address.controls;
    // Fields that should be disabled during search and enabled after
    // 'zipCode' is excluded because it drives the search
    const targetFields = ["number", "complement"] as const;

    // Disable fields to show loading state
    targetFields.forEach((field) => addressControls[field].disable());

    this.viaCepService.getAddressByZipCode(zipCode).subscribe({
      next: (address) => {
        if (!address.erro) {
          this.form.controls.address.patchValue({
            street: address.logradouro,
            neighborhood: address.bairro,
            city: address.localidade,
            state: address.uf
          });
        }
        // Always enable fields whether success or not found
        targetFields.forEach((field) => addressControls[field].enable());
      },
      error: () => {
        // Enable fields on error so user can manually enter
        targetFields.forEach((field) => addressControls[field].enable());
      }
    });
  }

  private loadTutor(id: string) {
    this.tutorService.getById(id).subscribe((tutor) => {
      this.form.patchValue(tutor);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();

    if (this.isEditMode()) {
      this.tutorService.update(this.id()!, payload as IUpdateTutor).subscribe(() => {
        this.router.navigate(["app/tutores"]);
      });
    } else {
      this.tutorService.create(payload as ICreateTutor).subscribe(() => {
        this.router.navigate(["app/tutores"]);
      });
    }
  }

  onCancel() {
    this.router.navigate(["app/tutores"]);
  }
}
