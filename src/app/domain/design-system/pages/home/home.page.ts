import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "../../../../libs/ui/components/button/button.component";

@Component({
  selector: "app-home",
  imports: [RouterLink, ButtonComponent],
  templateUrl: "./home.page.html"
})
export class HomePage {}
