import { ConnectionPositionPair, Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Directive, ElementRef, OnDestroy, inject, input } from "@angular/core";
import { VTooltipComponent } from "./v-tooltip.component";

@Directive({
  selector: "[vTooltip]",
  standalone: true,
  host: {
    // Escuta eventos para mostrar/esconder o tooltip
    "(mouseenter)": "show()",
    "(mouseleave)": "hide()",
    "(focus)": "show()",
    "(blur)": "hide()"
  }
})
export class VTooltipDirective implements OnDestroy {
  // Input obrigatório que define o texto do tooltip
  readonly vTooltip = input.required<string>();

  // Define a posição preferencial do tooltip (padrão: top)
  readonly vTooltipPosition = input<"top" | "bottom" | "left" | "right">("top");

  // Referência para o overlay criado
  private overlayRef: OverlayRef | null = null;

  // Serviços injetados do Angular CDK e Core
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private positionBuilder = inject(OverlayPositionBuilder);

  // Exibe o tooltip
  show() {
    // Se já estiver visível, não faz nada
    if (this.overlayRef) {
      return;
    }

    // Cria a estratégia de posicionamento baseada no elemento host e posição desejada
    const positionStrategy = this.positionBuilder.flexibleConnectedTo(this.elementRef).withPositions([this.getPosition()]);

    // Cria o overlay e anexa o componente do tooltip
    this.overlayRef = this.overlay.create({ positionStrategy });
    const tooltipPortal = new ComponentPortal(VTooltipComponent);
    const tooltipRef = this.overlayRef.attach(tooltipPortal);

    // Passa os dados (texto e lado) para a instância do componente criado
    tooltipRef.setInput("text", this.vTooltip());
    tooltipRef.setInput("side", this.vTooltipPosition());
  }

  // Esconde o tooltip
  hide() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }

  ngOnDestroy() {
    // Garante que o tooltip seja removido ao destruir a diretiva
    this.hide();
  }

  // Retorna a configuração de posicionamento do CDK baseada no input 'vTooltipPosition'
  private getPosition(): ConnectionPositionPair {
    switch (this.vTooltipPosition()) {
      case "top":
        return {
          originX: "center",
          originY: "top",
          overlayX: "center",
          overlayY: "bottom",
          offsetY: -8
        };
      case "bottom":
        return {
          originX: "center",
          originY: "bottom",
          overlayX: "center",
          overlayY: "top",
          offsetY: 8
        };
      case "left":
        return {
          originX: "start",
          originY: "center",
          overlayX: "end",
          overlayY: "center",
          offsetX: -8
        };
      case "right":
        return {
          originX: "end",
          originY: "center",
          overlayX: "start",
          overlayY: "center",
          offsetX: 8
        };
      default:
        return {
          originX: "center",
          originY: "top",
          overlayX: "center",
          overlayY: "bottom",
          offsetY: -8
        };
    }
  }
}
