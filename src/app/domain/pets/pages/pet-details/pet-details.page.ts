import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { ClinicalStatus } from "@core/enums/pet-domain.enums";
import { BadgeVariant } from "@libs/ui/components/badge/badge.constants";
import { ButtonComponent } from "@libs/ui/components/button/button.component";
import { VIconComponent } from "@libs/ui/components/icon/v-icon.component";
import { VTabComponent, VTabContentComponent, VTabsComponent, VTabTitleComponent } from "@libs/ui/components/tabs/v-tabs.component";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { BehaviorSubject, switchMap } from "rxjs";
import { PetService } from "../../services/pet.service";

import { PetClinicalSummaryComponent } from "./tabs/clinical-summary/pet-clinical-summary.component";
import { PetExamsTabComponent } from "./tabs/exams/pet-exams.component";
import { PetPrescriptionsTabComponent } from "./tabs/prescriptions/pet-prescriptions.component";
import { PetTimelineTabComponent } from "./tabs/timeline/pet-timeline.component";

@Component({
  selector: "app-pet-details",
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    VIconComponent,
    VTabsComponent,
    VTabComponent,
    VTabTitleComponent,
    VTabContentComponent,
    PetClinicalSummaryComponent,
    PetTimelineTabComponent,
    PetExamsTabComponent,
    PetPrescriptionsTabComponent
  ],
  templateUrl: "./pet-details.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetDetailsPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private petService = inject(PetService);
  private refresh$ = new BehaviorSubject<void>(void 0);

  // Fetch Pet Data
  pet = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get("id");
        if (id) {
          // Whenever params change or refresh$ emits, we fetch
          return this.refresh$.pipe(switchMap(() => this.petService.getById(id)));
        }
        return [];
      })
    )
  );

  constructor() {
    dayjs.locale("pt-br");
  }

  getStatusVariant(status: ClinicalStatus): BadgeVariant {
    switch (status) {
      case ClinicalStatus.HEALTHY:
        return "success";
      case ClinicalStatus.MONITORING:
        return "info";
      case ClinicalStatus.UNDER_TREATMENT:
        return "warning";
      case ClinicalStatus.CHRONIC:
        return "danger";
      case ClinicalStatus.POST_OP:
        return "warning";
      case ClinicalStatus.DECEASED:
        return "dark"; // Assuming dark variant exists or default
      default:
        return "default";
    }
  }

  formatDate(dateStr: string): string {
    return dayjs(dateStr).format("DD/MM/YYYY");
  }

  getAge(birthDate?: string): string {
    if (!birthDate) return "Desconhecida";
    const date = dayjs(birthDate);
    const now = dayjs();
    const years = now.diff(date, "year");
    const months = now.diff(date, "month") % 12;

    if (years > 0) {
      return years + " ano" + (years > 1 ? "s" : "") + (months > 0 ? " e " + months + " m" + (months > 1 ? "eses" : "ês") : "");
    }
    return months + " m" + (months > 1 ? "eses" : "ês");
  }

  onEdit() {
    const pet = this.pet();
    if (pet) {
      this.router.navigate(["app/pets/editar", pet.id]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (file.size > 2 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const pet = this.pet();
        if (pet) {
          this.petService.update(pet.id, { photoUrl: base64 }).subscribe({
            next: () => {
              this.refresh$.next();
            },
            error: (err: unknown) => console.error("Error uploading photo", err)
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  viewTutor(tutorId: string) {
    if (tutorId) {
      this.router.navigate(["app/tutores/consultar/", tutorId]);
    }
  }
}
