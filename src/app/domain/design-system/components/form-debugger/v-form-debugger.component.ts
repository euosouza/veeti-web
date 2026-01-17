import { JsonPipe } from "@angular/common";
import { Component, computed, input } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

@Component({
  selector: "v-form-debugger",
  standalone: true,
  imports: [JsonPipe],
  host: {
    class: "block w-full"
  },
  template: `
    @if (control(); as ctrl) {
      <div class="p-8 rounded-xl border border-border bg-card-background flex flex-col text-sm font-mono">
        <div class="pb-4 border-b border-border flex justify-between items-center">
          <h3 class="font-semibold text-foreground">{{ title() }}</h3>
          <span class="text-xs px-2 py-0.5 rounded-full border" [class.text-success-500]="ctrl.valid" [class.text-error-500]="ctrl.invalid">
            {{ ctrl.status }}
          </span>
        </div>

        <div class="flex-1 overflow-auto mt-4 space-y-6 bg-transparent">
          @for (item of formGroupControls(); track item.key) {
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="font-bold text-foreground">{{ item.key }}</span>
                <span class="text-xs text-muted-foreground">{{ getControlType(item.value) }}</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <!-- Valid -->
                <div class="p-2 rounded bg-background border border-border flex justify-between">
                  <span class="text-muted-foreground">valid</span>
                  <span [class.text-success-500]="item.value.valid" [class.text-error-500]="!item.value.valid">
                    {{ item.value.valid }}
                  </span>
                </div>

                <!-- Touched -->
                <div class="p-2 rounded bg-background border border-border flex justify-between">
                  <span class="text-muted-foreground">touched</span>
                  <span [class.text-success-500]="item.value.touched" [class.text-error-500]="!item.value.touched">
                    {{ item.value.touched }}
                  </span>
                </div>

                <!-- Disabled -->
                <div class="p-2 rounded bg-background border border-border flex justify-between">
                  <span class="text-muted-foreground">disabled</span>
                  <span [class.text-success-500]="item.value.disabled" [class.text-error-500]="!item.value.disabled">
                    {{ item.value.disabled }}
                  </span>
                </div>

                <!-- Value -->
                <div class="p-2 rounded bg-background border border-border flex justify-between col-span-2">
                  <span class="text-muted-foreground">value</span>
                  <span class="text-foreground truncate max-w-[150px]" title="{{ item.value.value | json }}">
                    {{ item.value.value | json }}
                  </span>
                </div>
              </div>
            </div>
          } @empty {
            <!-- Fallback if it's just a single control not a group, or empty group -->
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="font-bold text-foreground">Control</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-2 rounded bg-background border border-border flex justify-between">
                  <span class="text-muted-foreground">valid</span>
                  <span [class.text-success-500]="ctrl.valid" [class.text-error-500]="ctrl.invalid">{{ ctrl.valid }}</span>
                </div>
                <div class="p-2 rounded bg-background border border-border flex justify-between">
                  <span class="text-muted-foreground">touched</span>
                  <span [class.text-success-500]="ctrl.touched" [class.text-error-500]="!ctrl.touched">{{ ctrl.touched }}</span>
                </div>
                <div class="p-2 rounded bg-background border border-border flex justify-between">
                  <span class="text-muted-foreground">disabled</span>
                  <span [class.text-success-500]="ctrl.disabled" [class.text-error-500]="!ctrl.disabled">{{ ctrl.disabled }}</span>
                </div>
                <div class="p-2 rounded bg-background border border-border flex justify-between col-span-2">
                  <span class="text-muted-foreground">value</span>
                  <span class="text-foreground truncate max-w-[150px]">{{ ctrl.value | json }}</span>
                </div>
              </div>
            </div>
          }
        </div>

        <div class="pt-4 mt-auto border-t border-border text-xs text-muted-foreground">
          <p>Observe como os estados mudam ao interagir com o formulário.</p>
        </div>
      </div>
    }
  `
})
export class VFormDebuggerComponent {
  readonly control = input<AbstractControl | null>(null);
  readonly title = input<string>("Depurador de Formulário");

  readonly formGroupControls = computed(() => {
    const ctrl = this.control();
    if (ctrl instanceof FormGroup) {
      return Object.entries(ctrl.controls).map(([key, value]) => ({ key, value: value as AbstractControl }));
    }
    return [];
  });

  getControlType(control: AbstractControl): string {
    if (control instanceof FormGroup) return "FormGroup";
    // AbstractControl doesn't strictly imply FormControl but it likely is one in this context
    return "FormControl";
  }
}
