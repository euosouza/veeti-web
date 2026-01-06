import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { DefaultColorsGridComponent } from "../../../components/default-colors-grid/default-colors-grid.component";
import { SemanticColorsGridComponent } from "../../../components/semantic-colors-grid/semantic-colors-grid.component";
import { BRANDING_PRIMARY_COLORS, BRANDING_SECONDARY_COLORS, BRANDING_TERTIARY_COLORS } from "../../../constants/branding-colors.constants";
import { NEUTRAL_COLORS } from "../../../constants/colors.constants";
import { SEMANTIC_COLORS } from "../../../constants/semantic-colors.constants";
@Component({
  selector: "app-colors",
  imports: [CommonModule, SemanticColorsGridComponent, DefaultColorsGridComponent],
  standalone: true,
  templateUrl: "./colors.page.html"
})
export class ColorsPage {
  public primaryColors = BRANDING_PRIMARY_COLORS;
  public secondaryColors = BRANDING_SECONDARY_COLORS;
  public tertiaryColors = BRANDING_TERTIARY_COLORS;
  public neutralColors = NEUTRAL_COLORS;
  public semanticColors = SEMANTIC_COLORS;
}
