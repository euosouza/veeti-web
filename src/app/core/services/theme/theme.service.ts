import { Injectable, signal } from "@angular/core";

type Theme = "light" | "dark";

@Injectable({ providedIn: "root" })
export class ThemeService {
  private theme = signal<Theme>("light");

  private set(theme: Theme): void {
    this.theme.set(theme);

    localStorage.setItem("theme", theme);
  }

  get(): Theme {
    return this.theme();
  }

  load(): void {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const theme: Theme = storedTheme ?? (systemPrefersDark ? "dark" : "light");

    this.set(theme);
    this.apply();
  }

  private apply(): void {
    document.documentElement.setAttribute("data-theme", this.theme());
  }

  toggle(): void {
    const newTheme: Theme = this.theme() === "light" ? "dark" : "light";
    this.set(newTheme);
    this.apply();
  }
}
