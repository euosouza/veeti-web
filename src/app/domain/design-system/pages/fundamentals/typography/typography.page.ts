import { Component } from "@angular/core";
import { ButtonComponent } from "../../../../../libs/ui/components/button/button.component";

interface EscalaTitulo {
  token: "H1" | "H2" | "H3" | "H4" | "H5" | "H6";
  specs: {
    size: string;
    weight: string;
    classText: string;
  };
  preview: string;
  element?: string;
}

@Component({
  selector: "app-typography",
  imports: [ButtonComponent],
  templateUrl: "./typography.page.html"
})
export class TypographyPage {
  escalaTitulos: EscalaTitulo[] = [
    {
      token: "H1",
      specs: {
        size: "36px / 40px",
        weight: "Bold (700)",
        classText: "text-4xl font-bold"
      },
      preview: "Prontuário do Paciente",
      element: `<h1 class="text-4xl font-bold text-text-main dark:text-white leading-tight">
        Prontuário do Paciente
      </h1>`
    },
    {
      token: "H2",
      specs: {
        size: "30px / 36px",
        weight: "SemiBold (600)",
        classText: "text-3xl font-semibold"
      },
      preview: "Histórico Clínico"
    },
    {
      token: "H3",
      specs: {
        size: "24px / 32px",
        weight: "SemiBold (600)",
        classText: "text-2xl font-semibold"
      },
      preview: "Vacinas Agendadas"
    },
    {
      token: "H4",
      specs: {
        size: "20px / 28px",
        weight: "Medium (500)",
        classText: "text-xl font-medium"
      },
      preview: "Dados do Tutor"
    },
    {
      token: "H5",
      specs: {
        size: "18px / 28px",
        weight: "Medium (500)",
        classText: "text-lg font-medium"
      },
      preview: "Exames Recentes"
    },
    {
      token: "H6",
      specs: {
        size: "14px / 24px",
        weight: "Medium (500)",
        classText: "text-md font-medium"
      },
      preview: "Dados do Paciente"
    }
  ];
}
