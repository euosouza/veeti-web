import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { IPet } from "@domain/pets/interfaces/pet.interface";
import { VAvatarComponent } from "@libs/ui/components/avatar/v-avatar.component";
import { VIconComponent } from "@libs/ui/components/icon/v-icon.component";
import dayjs from "dayjs";

@Component({
  selector: "app-pet-clinical-summary",
  standalone: true,
  imports: [CommonModule, VIconComponent, VAvatarComponent],
  templateUrl: "./pet-clinical-summary.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetClinicalSummaryComponent {
  pet = input<IPet | undefined>();
  viewTutor = output<string>();

  onViewTutor(id: string) {
    this.viewTutor.emit(id);
  }

  formatDate(dateStr: string): string {
    return dayjs(dateStr).format("DD/MM/YYYY");
  }
}
