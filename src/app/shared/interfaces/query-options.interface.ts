export interface QueryOptions {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  filters?: Record<string, string | number | boolean>;
}
