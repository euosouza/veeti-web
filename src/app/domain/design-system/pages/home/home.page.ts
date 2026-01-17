import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "../../../../libs/ui/components/button/button.component";
import { VIconComponent } from "../../../../libs/ui/components/icon/v-icon.component";

@Component({
  selector: "app-home",
  imports: [RouterLink, ButtonComponent, VIconComponent],
  templateUrl: "./home.page.html"
})
export class HomePage {}
