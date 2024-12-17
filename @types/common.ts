export type SortType = "asc" | "desc";

export type OrderBy = { field: string; type: SortType };

export type FieldType = "number" | "string" | "date";

export type FilterType = "equals" | "contains" | "array" | "lt" | "st";

export type Filter = { [field: string]: { value: unknown; filterType: FilterType, fieldType?: FieldType } };

export type renderFilterProps = {
  field: string;
  value?: unknown;
  onChange: (filter: Filter) => void;
  anchorEl: Element | null;
  open: boolean;
};

export type ListFetchRequest = {
  size?: number;
  offset?: number; // for pagination
  cursorValue?: number | string; // the last fetched value of the sort field (for infinite scroll)
  sort?: OrderBy;
  filters?: Filter;
};
