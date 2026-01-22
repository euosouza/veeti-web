import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClinicalStatus, PetGender, PetSpecies } from "@core/enums/pet-domain.enums";
import { ICreatePet } from "@domain/pets/interfaces/pet.interface"; // Assuming update payload is same for now or partial
import { PetService } from "@domain/pets/services/pet.service";
import { ITutor } from "@domain/tutor/interfaces/tutor.interface";
import { TutorService } from "@domain/tutor/services/tutor.service";
import { VBreadcrumbConfig } from "@libs/ui/components/breadcrumb/v-breadcrumb.component";
import { ButtonComponent } from "@libs/ui/components/button/button.component";
import { VCardComponent } from "@libs/ui/components/card/v-card.component";
import { VInputDirective } from "@libs/ui/components/input/v-input.directive";
import { VLabelComponent } from "@libs/ui/components/label/v-label.component";
import { PageHeaderComponent } from "src/app/shared/components/page-header/page-header.component";

@Component({
  selector: "app-pet-form",
  imports: [ReactiveFormsModule, VInputDirective, ButtonComponent, PageHeaderComponent, VCardComponent, VLabelComponent],
  templateUrl: "./form-pet.page.html"
})
export class PetFormPage implements OnInit {
  private readonly petService = inject(PetService);
  private readonly tutorService = inject(TutorService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  tutors = signal<ITutor[]>([]);
  id = signal<string | null>(null);
  isEditMode = computed(() => !!this.id());
  isLoading = this.petService.isLoading;

  title = computed(() => (this.isEditMode() ? "Editar Pet" : "Criar Pet"));
  subtitle = computed(() => (this.isEditMode() ? "Atualize as informações do pet." : "Preencha o formulário abaixo para cadastrar um novo pet."));
  breadcrumb = computed<VBreadcrumbConfig>(() => ({
    separator: "arrow",
    items: [
      { label: "Home", path: "/" },
      { label: "Pets", path: "/app/pets" },
      { label: this.isEditMode() ? "Editar Pet" : "Criar Pet", path: "" }
    ]
  }));

  speciesOptions = Object.values(PetSpecies);

  genderOptions = Object.values(PetGender);

  statusOptions = Object.values(ClinicalStatus);

  form = new FormGroup({
    tutorId: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    species: new FormControl<PetSpecies>(PetSpecies.CANINE, { nonNullable: true, validators: [Validators.required] }),
    breed: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    gender: new FormControl<PetGender>(PetGender.MALE, { nonNullable: true, validators: [Validators.required] }),
    birthDate: new FormControl("", { nonNullable: true }), // Removed validators.required as per interface optionality hint? interface says string | undefined but in form creation it might be good to have. User comment said optional. Keep optional or required? User said "ISO Date (opcional, pois nem sempre se sabe a data exata)". So optional.
    weightKg: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }), // Optional in interface? weightKg?: number.
    clinicalStatus: new FormControl<ClinicalStatus>(ClinicalStatus.HEALTHY, { nonNullable: true, validators: [Validators.required] }),
    notes: new FormControl("", { nonNullable: true })
  });

  ngOnInit(): void {
    this.loadTutors();
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.id.set(id);
      this.loadPet(id);
    } else {
      // Check for tutorId query param
      const tutorId = this.route.snapshot.queryParamMap.get("tutorId");
      if (tutorId) {
        this.form.patchValue({ tutorId });
      }
    }
  }

  private loadTutors() {
    this.tutorService.getAllTutors().subscribe((data) => {
      this.tutors.set(data || []);
    });
  }

  private loadPet(id: string) {
    this.petService.getById(id).subscribe((pet) => {
      this.form.patchValue(pet); // Ensure types match, weight might need handling if API returns string but interface says number
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();

    if (this.isEditMode()) {
      this.petService.update(this.id()!, payload).subscribe(() => {
        this.router.navigate(["app/pets"]);
      });
    } else {
      this.petService.create(payload as ICreatePet).subscribe(() => {
        this.router.navigate(["app/pets"]);
      });
    }
  }

  onCancel() {
    this.router.navigate(["app/pets"]);
  }
}
