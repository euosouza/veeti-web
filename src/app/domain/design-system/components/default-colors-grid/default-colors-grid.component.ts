import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { copyClipboard } from "../../../../shared/utils/copy-clipboard.utils";
import { IDefaultColor } from "../../interfaces/colors.interfaces";

@Component({
  selector: "app-default-colors-grid",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./default-colors-grid.component.html"
})
export class DefaultColorsGridComponent {
  @Input() public colors!: IDefaultColor[];

  public onClickCopy(text: string) {
    copyClipboard(text);
  }
}
