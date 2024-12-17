export type SortType = "asc" | "desc";

export type OrderBy = { field: string; type: SortType };

export type FilterType = string | number | Array<string | number>;

export type Filter = { [field: string]: unknown };

export type ListFetchRequest = {
  size?: number;
  offset?: number; // for pagination
  cursorValue?: number | string; // the last fetched value of the sort field (for infinite scroll)
  sort?: OrderBy;
  filters?: Filter;
};
