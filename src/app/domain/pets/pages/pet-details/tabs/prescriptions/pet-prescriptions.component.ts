import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { VIconComponent } from "@libs/ui/components/icon/v-icon.component";

@Component({
  selector: "app-pet-prescriptions-tab",
  standalone: true,
  imports: [CommonModule, VIconComponent],
  templateUrl: "./pet-prescriptions.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetPrescriptionsTabComponent {}
