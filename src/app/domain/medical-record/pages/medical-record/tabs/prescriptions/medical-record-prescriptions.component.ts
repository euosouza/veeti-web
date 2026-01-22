import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { VIconComponent } from "@libs/ui/components/icon/v-icon.component";

@Component({
  selector: "app-medical-record-prescriptions-tab",
  standalone: true,
  imports: [CommonModule, VIconComponent],
  templateUrl: "./medical-record-prescriptions.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedicalRecordPrescriptionsTabComponent {}
