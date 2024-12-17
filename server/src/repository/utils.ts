import { Filter, OrderBy } from "../../../@types/common";

export function getOrderByClause(sort?: OrderBy) {
  let orderBy: Record<string | number | symbol, unknown> = {};

  if (sort) {
    const field = sort.field;
    orderBy[field] = sort.type;
  }
  return orderBy;
}

export function getWhereClause(filters?: Filter) {
  let where: Record<string | number | symbol, unknown> = {};
  if (filters) {
    for (let filter in filters) {
      const value = filters[filter];
      const whereFilter = filter;
      if (Array.isArray(value)) {
        where[whereFilter] = { in: value };
      } else if (typeof value === "string") {
        where[whereFilter] = {
          contains: value,
        };
      } else {
        where[whereFilter] = {
          equals: value,
        };
      }
    }
  }
  return where;
}
