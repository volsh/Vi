import { Filter, FilterType, OrderBy } from "../../../@types/common";

export function getOrderByClause(sort?: OrderBy) {
  let orderBy: Record<string | number | symbol, unknown> = {};

  if (sort) {
    const field = sort.field;
    orderBy[field] = sort.type;
  }
  return orderBy;
}

export function getConditionByFilterType(
  filterType: FilterType,
  value: unknown
) {
  switch (filterType) {
    case "array":
      return { in: value };
    case "contains":
      return {
        contains: value,
      };
    // @TODO continue cases
    default:
      return {
        equals: value,
      };
  }
}

export function getWhereClause(filters?: Filter) {
  let where: Record<string | number | symbol, unknown> = {};
  if (filters) {
    for (let filter in filters) {
      const { value, filterType, fieldType } = filters[filter];
      if (value !== undefined && value !== "") {
        const castedValue = fieldType === "number" ? Number(value) : value;
        const whereFilter = filter;
        where[whereFilter] = getConditionByFilterType(filterType, castedValue);
      }
    }
  }
  return where;
}
