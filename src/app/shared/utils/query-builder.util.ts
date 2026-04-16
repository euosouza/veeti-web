import { QueryOptions } from "../interfaces/query-options.interface";

export function buildQueryParams(options: QueryOptions, searchField = "q"): Record<string, string | number | boolean> {
  const params: Record<string, string | number | boolean> = {
    _page: options.page,
    _per_page: options.limit
  };

  if (options.search) {
    params[searchField] = options.search;
  }

  if (options.sort) {
    params["_sort"] = options.sort;
  }

  if (options.order) {
    params["_order"] = options.order;
  }

  if (options.filters) {
    // Spread generic filters into the main params object
    Object.assign(params, options.filters);
  }

  return params;
}
