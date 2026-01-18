import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VCardComponent } from "../../../../../libs/ui/components/card/v-card.component";
import { VCheckboxComponent } from "../../../../../libs/ui/components/checkbox/v-checkbox.component";
import { VInputDirective } from "../../../../../libs/ui/components/input/v-input.directive";
import { VLabelComponent } from "../../../../../libs/ui/components/label/v-label.component";
import { PaginationVariant, VPaginationComponent } from "../../../../../libs/ui/components/pagination/pagination.component";
import { VTableComponent } from "../../../../../libs/ui/components/table/v-table.component";
import { VTableColumn } from "../../../../../libs/ui/components/table/v-table.interface";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { PlaygroundConfig } from "../../../constants/playground.constants";

interface Tab {
  name: string;
  active: boolean;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: "app-pagination-demo",
  standalone: true,
  imports: [VPaginationComponent, VInputDirective, VLabelComponent, VCheckboxComponent, PlaygroundComponent, VTableComponent, VCardComponent, FormsModule],
  templateUrl: "./pagination-demo.page.html"
})
export class PaginationDemoPage {
  readonly config = signal<PlaygroundConfig>({
    title: "Pagination",
    description: "Pagination permite a navegação através de grandes conjuntos de dados divididos em páginas.",
    documentation: {
      tableInputs: [
        {
          props: "total",
          types: "number",
          default: "undefined",
          description: "O número total de itens."
        },
        {
          props: "pageSize",
          types: "number",
          default: "undefined",
          description: "O número de itens por página."
        },
        {
          props: "currentPage",
          types: "number",
          default: "undefined",
          description: "A página atual selecionada."
        },
        {
          props: "variant",
          types: "'default' | 'numeric' | 'item-count' | 'mobile' | 'input-jump'",
          default: "'default'",
          description: "O estilo de exibição da paginação."
        },
        {
          props: "disabled",
          types: "boolean",
          default: "false",
          description: "Desabilita os controles de paginação."
        },
        {
          props: "pageSizeOptions",
          types: "number[]",
          default: "[]",
          description: "Opções de tamanho de página para o seletor."
        }
      ],
      tableOutputs: [
        {
          props: "pageChange",
          return: "EventEmitter<number>",
          description: "Disparado quando a página é alterada."
        },
        {
          props: "pageSizeChange",
          return: "EventEmitter<number>",
          description: "Disparado quando o tamanho da página é alterado."
        }
      ]
    }
  });

  tabs = signal<Tab[]>([
    { name: "Overview", active: true },
    { name: "API", active: false }
  ]);
  currentTab = signal<Tab>(this.tabs()[0]);

  // Overview Playground State
  total = signal(100);
  pageSize = signal(10);
  currentPage = signal(1);
  disabled = signal(false);
  pageSizeOptions = signal([5, 10, 20, 50]);
  variant = signal<PaginationVariant>("default");

  // Examples Tab State
  posts = signal<Post[]>([]);
  postsTotal = signal(0);
  postsPage = signal(1);
  postsPageSize = signal(5);
  postsLoading = signal(false);

  readonly postColumns: VTableColumn<Post>[] = [
    { key: "id", label: "ID", fixed: "left" },
    { key: "title", label: "Título" },
    { key: "body", label: "Conteúdo" }
  ];

  constructor() {
    // Initial fetch for examples
    this.fetchPosts();
  }

  readonly codeSnippet = computed(() => {
    return `
      <v-pagination
        [total]="${this.total()}"
        [pageSize]="${this.pageSize()}"
        [currentPage]="${this.currentPage()}"
        [variant]="'${this.variant()}'"
        [pageSizeOptions]="[${this.pageSizeOptions()}]"
        [disabled]="${this.disabled()}"
        (pageChange)="onPageChange($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      ></v-pagination>
    `;
  });

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }

  // Example Tab Handlers
  onPostsPageChange(page: number) {
    this.postsPage.set(page);
    this.fetchPosts();
  }

  async fetchPosts() {
    this.postsLoading.set(true);
    try {
      const page = this.postsPage();
      const limit = this.postsPageSize();
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
      const totalCount = Number(response.headers.get("x-total-count")) || 100; // Mock total if header missing
      const data = await response.json();

      this.posts.set(data);
      this.postsTotal.set(totalCount);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      this.postsLoading.set(false);
    }
  }

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((tabs) => tabs.map((t) => ({ ...t, active: t.name === tab.name })));
  }
}
