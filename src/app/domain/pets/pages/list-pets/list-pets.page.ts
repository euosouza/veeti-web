import { AfterViewInit, Component, inject, TemplateRef, ViewChild } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ClinicalStatus, PetGender } from "@core/enums/pet-domain.enums";
import { IPet } from "@domain/pets/interfaces/pet.interface";
import { PetService } from "@domain/pets/services/pet.service";
import { VAvatarComponent } from "@libs/ui/components/avatar/v-avatar.component";
import { BadgeVariant } from "@libs/ui/components/badge/badge.constants";
import { VBreadcrumbConfig } from "@libs/ui/components/breadcrumb/v-breadcrumb.component";
import { ButtonComponent } from "@libs/ui/components/button/button.component";
import { VCardComponent } from "@libs/ui/components/card/v-card.component";
import { VIconComponent } from "@libs/ui/components/icon/v-icon.component";
import { VInputGroupComponent } from "@libs/ui/components/input/v-input-group.component";
import { VInputDirective } from "@libs/ui/components/input/v-input.directive";
import { VPaginationComponent } from "@libs/ui/components/pagination/pagination.component";
import { VTableComponent } from "@libs/ui/components/table/v-table.component";
import { VTableColumn } from "@libs/ui/components/table/v-table.interface";
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from "rxjs";
import { PageHeaderComponent } from "src/app/shared/components/page-header/page-header.component";

@Component({
  selector: "app-list-pets",
  imports: [
    PageHeaderComponent,
    VTableComponent,
    VPaginationComponent,
    VInputDirective,
    ButtonComponent,
    VIconComponent,
    ReactiveFormsModule,
    VInputGroupComponent,
    VCardComponent,
    VAvatarComponent,
    RouterLink
  ],
  templateUrl: "./list-pets.page.html"
})
export class ListPetsPage implements AfterViewInit {
  private readonly petService = inject(PetService);
  private readonly router = inject(Router);

  @ViewChild("tutorTemplate") tutorTemplate!: TemplateRef<IPet>;
  @ViewChild("nameTemplate") nameTemplate!: TemplateRef<IPet>;

  title = "Pets";
  subtitle = "Gerencie a lista de pets cadastrados.";
  breadcrumb: VBreadcrumbConfig = {
    separator: "arrow",
    items: [
      { label: "Home", path: "/" },
      { label: "Pets", path: "/app/pets" }
    ]
  };

  searchControl = new FormControl("", { nonNullable: true });

  pets = this.petService.pets;
  isLoading = this.petService.isLoading;
  totalItems = this.petService.totalItems;
  currentPage = this.petService.page;
  pageSize = this.petService.pageSize;

  columns: VTableColumn<IPet>[] = [];

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        startWith(""),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.petService.setPage(1)), // Reset page on search
        switchMap((query) => this.petService.loadAll(query)),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngAfterViewInit() {
    this.columns = [
      { key: "name", label: "Nome", fixed: "left", template: this.nameTemplate },
      {
        key: "tutor",
        label: "Tutor",
        template: this.tutorTemplate,
        width: "200px"
      },
      {
        key: "species",
        label: "Espécie",
        type: "badge",
        badge: {
          variant: "info"
        }
      },
      { key: "breed", label: "Raça" },
      {
        key: "gender",
        label: "Gênero",
        type: "badge",
        badge: {
          variant: (row) => this.getGenderVariant(row.gender)
        }
      },
      { key: "weightKg", label: "Peso (kg)" },
      {
        key: "clinicalStatus",
        label: "Status",
        type: "badge",
        badge: {
          variant: (row) => this.getStatusVariant(row.clinicalStatus)
        }
      },
      {
        key: "actions",
        label: "Ações",
        type: "actions",
        fixed: "right",
        align: "center",
        actions: [
          {
            label: "Editar",
            icon: "edit",
            action: (row) => this.onEdit(row)
          },
          {
            label: "Excluir",
            icon: "delete",
            danger: true,
            action: (row) => this.onDelete(row)
          }
        ]
      }
    ];
  }

  onPageChange(page: number) {
    this.petService.setPage(page);
    this.petService.loadAll(this.searchControl.value).subscribe();
  }

  onPageSizeChange(size: number) {
    this.petService.setPageSize(size);
    this.petService.loadAll(this.searchControl.value).subscribe();
  }

  onCreate() {
    this.router.navigate(["app/pets/novo"]);
  }

  onEdit(pet: IPet) {
    this.router.navigate(["app/pets/editar", pet.id]);
  }

  onDelete(pet: IPet) {
    if (confirm(`Tem certeza que deseja excluir o pet ${pet.name}?`)) {
      this.petService.remove(pet.id).subscribe();
    }
  }

  private getStatusVariant(status: ClinicalStatus): BadgeVariant {
    switch (status) {
      case ClinicalStatus.HEALTHY:
        return "success";
      case ClinicalStatus.UNDER_TREATMENT:
        return "warning";
      case ClinicalStatus.CHRONIC:
        return "info";
      case ClinicalStatus.POST_OP:
        return "warning";
      case ClinicalStatus.DECEASED:
        return "danger";
      default:
        return "default";
    }
  }

  private getGenderVariant(gender: PetGender): BadgeVariant {
    return gender === PetGender.MALE ? "info" : "danger";
  }
}
