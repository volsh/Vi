import { Filter, SortType } from "../../../../../@types/common";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import { TableCell, TableRow } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FilterComponent, { renderFilterProps } from "../Filters/Filter/Filter";

export type HeadCell = {
  id: string;
  label: string;
  hasFilter?: boolean;
  numeric?: boolean;
  width?: number;
};

interface TableHeadProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange?: (filter: Filter) => void;
  sortType?: SortType;
  orderBy?: string;
  filters?: Filter;
  renderFilter?: (props: renderFilterProps) => React.ReactElement;
  rowCount: number;
  headCells: HeadCell[];
}

export default function DataTableHead(props: TableHeadProps) {
  const {
    onSelectAllClick,
    sortType = "asc",
    orderBy = "id",
    filters,
    numSelected,
    rowCount,
    onRequestSort,
    onFilterChange,
    headCells,
    renderFilter,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
          inputProps={{
            "aria-label": "select all tasks",
          }}
        />
      </TableCell>
      {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          variant="head"
          align={headCell.numeric ? "right" : "left"}
          sortDirection={orderBy === headCell.id ? sortType : false}
          style={{ width: headCell.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? sortType : "asc"}
            onClick={createSortHandler(headCell.id)}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {sortType === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>

          {headCell.hasFilter && renderFilter && onFilterChange && (
            <FilterComponent
              field={headCell.id}
              filterValue={filters?.[headCell.id]}
              filterFunction={onFilterChange}
              renderFilter={renderFilter}
            />
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}
