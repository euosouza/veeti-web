import { Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ITutor } from "@domain/tutor/interfaces/tutor.interface";
import { TutorService } from "@domain/tutor/services/tutor.service";
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
  selector: "app-list-tutors",
  imports: [
    PageHeaderComponent,
    VTableComponent,
    VPaginationComponent,
    VInputDirective,
    ButtonComponent,
    VIconComponent,
    ReactiveFormsModule,
    VInputGroupComponent,
    VCardComponent
  ],
  templateUrl: "./list-tutors.page.html"
})
export class ListTutorsPage {
  private readonly tutorService = inject(TutorService);
  private readonly router = inject(Router);

  title = "Tutores";
  subtitle = "Gerencie a lista completa de tutores cadastrados. Adicione novos registros, atualize informações essenciais de contato, controle o histórico de atendimentos.";
  breadcrumb: VBreadcrumbConfig = {
    separator: "arrow",
    items: [
      { label: "Home", path: "/" },
      { label: "Tutores", path: "/tutores" }
    ]
  };

  searchControl = new FormControl("", { nonNullable: true });

  tutors = this.tutorService.tutors;
  isLoading = this.tutorService.isLoading;
  totalItems = this.tutorService.totalItems;
  currentPage = this.tutorService.page;
  pageSize = this.tutorService.pageSize;

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        startWith(""),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.tutorService.setPage(1)), // Reset page on search
        switchMap((query) => this.tutorService.loadAll(query)),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  columns: VTableColumn<ITutor>[] = [
    { key: "fullName", label: "Nome", fixed: "left" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Telefone" },
    { key: "cpf", label: "CPF" },
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

  onPageChange(page: number) {
    this.tutorService.setPage(page);
    this.tutorService.loadAll(this.searchControl.value).subscribe();
  }

  onPageSizeChange(size: number) {
    this.tutorService.setPageSize(size);
    this.tutorService.loadAll(this.searchControl.value).subscribe();
  }

  onCreate() {
    this.router.navigate(["app/tutores/novo"]);
  }

  onEdit(tutor: ITutor) {
    this.router.navigate(["app/tutores/editar", tutor.id]);
  }

  onDelete(tutor: ITutor) {
    if (confirm(`Tem certeza que deseja excluir o tutor ${tutor.fullName}?`)) {
      this.tutorService.remove(tutor.id).subscribe();
    }
  }
}
