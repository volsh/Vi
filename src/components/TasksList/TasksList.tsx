import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { TableVirtuoso, TableComponents, ItemProps } from "react-virtuoso";
import {
  FilterType,
  ShortTask,
  SortType,
  StatusTypes,
} from "../../../typings/taskTypes";
import { deleteTasks, fetchTasks } from "../../api/tasksApi";
import BasicModal from "../common/BasicModal/BasicModal";
import AddOrEditTask from "../AddOrEditTask/AddOrEditTask";
import { Alert, Backdrop, CircularProgress } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import MultipleSelectCheckmarks, {
  SelectItem,
} from "../common/MultipleSelectCheckmarks/MultipleSelectCheckmarks";

interface HeadCell {
  id: keyof ShortTask;
  label: string;
  numeric?: boolean;
  width?: number;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    label: "ID",
  },
  {
    id: "title",
    numeric: false,
    label: "Title",
  },
  {
    id: "dueDate",
    numeric: false,
    label: "Due Date",
  },
  {
    id: "status",
    numeric: false,
    label: "Status",
  },
  {
    id: "priority",
    numeric: false,
    label: "Priority",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ShortTask
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (filter: FilterType) => void;
  sortType: SortType;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    sortType,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    onFilterChange,
  } = props;
  const [showFilter, setShowFilter] = React.useState<boolean>(false);
  const createSortHandler =
    (property: keyof ShortTask) => (event: React.MouseEvent<unknown>) => {
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
          <StyledFilterIcon
            size="small"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <FilterListIcon sx={{ fontSize: "1em", background: "none" }} />
          </StyledFilterIcon>
          {showFilter && getFilterForField(headCell.id, onFilterChange)}
        </TableCell>
      ))}
    </TableRow>
  );
}
function getFilterForField(
  field: string,
  filterFunction: (filter: FilterType) => void
) {
  switch (field) {
    case "status":
      return (
        <Box sx={{ position: "absolute" }}>
          <MultipleSelectCheckmarks
            open={true}
            label="Status Filter"
            items={
              StatusTypes.map((statusType) => ({
                value: statusType,
                label: statusType,
              })) as unknown as Array<SelectItem>
            }
            onChange={(values) => filterFunction({ status: values })}
          />
        </Box>
      );
    default:
      return null;
  }
}
interface EnhancedTableToolbarProps {
  handleAddTaskClick: () => void;
  numSelected: number;
  handleDelete: () => void;
  deleting: boolean;
  deleteStatus: "success" | "error" | undefined;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    handleAddTaskClick,
    numSelected,
    handleDelete,
    deleting,
    deleteStatus,
  } = props;

  return (
    <>
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          },
          numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          },
        ]}
      >
        <Fab
          color="primary"
          size="small"
          aria-label="add"
          onClick={handleAddTaskClick}
        >
          <AddIcon />
        </Fab>
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Tasks
          </Typography>
        )}
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete} disabled={deleting}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {deleteStatus && (
          <>
            {deleteStatus === "error" ? (
              <StyledAlert severity="error">
                Failed to delete task. Please try again later
              </StyledAlert>
            ) : (
              <StyledAlert severity="success">
                Tasks were successfully deleted
              </StyledAlert>
            )}
          </>
        )}
      </Toolbar>
    </>
  );
}
const StyledAlert = styled(Alert)(
  ({ theme }) => `
     width: 95%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);   `
);

const StyledFilterIcon = styled(IconButton)(
  ({ theme }) => `
    // visibility: hidden;
    &:hover {
        visibility: visible;
    }
      `
);

export default function TasksList() {
  const [tasks, setTasks] = React.useState<Array<ShortTask>>([]);
  const [sortType, setSortType] = React.useState<SortType>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof ShortTask>("id");
  const [filters, setFilters] = React.useState<FilterType>({} as FilterType);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [activeTask, setActiveTask] = React.useState<number>();
  const [newTask, setNewTask] = React.useState<boolean>(false);
  const [deleting, setDeleting] = React.useState<boolean>(false);
  const [deleteStatus, setDeleteStatus] = React.useState<"success" | "error">();

  const requestBody = React.useMemo(
    () => ({
      sort: {
        type: sortType,
        orderBy,
      },
      filters,
    }),
    [sortType, orderBy, filters]
  );

  const handleFetchTasks = () => {
    fetchTasks(requestBody)
      .then((tasks) => setTasks(tasks))
      .catch((err) => console.log(`failed to load tasks - ${err}`));
  };

  React.useEffect(() => {
    handleFetchTasks();
  }, [requestBody]);

  const handleDelete = () => {
    setDeleting(true);
    deleteTasks(selected)
      .then(({ ids }) => {
        setDeleteStatus("success");
        setSelected([]);
        setTasks((prev) => prev.filter((task) => !ids.includes(task.id)));
      })
      .catch((err) => {
        console.log(`failed to delete tasks ${err}`);
        setDeleteStatus("error");
      })
      .finally(() => {
        setDeleting(false);
        setTimeout(() => {
          setDeleteStatus(undefined);
        }, 3000);
      });
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ShortTask
  ) => {
    const isAsc = orderBy === property && sortType === "asc";
    setSortType(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterUpdate = (filter: FilterType) => {
    setFilters((prev) => ({ ...prev, ...filter }));
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = tasks.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const VirtuosoTableComponents: TableComponents<ShortTask> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        aria-labelledby="tableTitle"
        stickyHeader
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow: (props) => {
      const { item: row } = props as ItemProps<ShortTask>;

      const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
        setActiveTask(row.id);
      };

      return (
        <TableRow
          {...props}
          hover
          onClick={handleRowClick}
          tabIndex={-1}
          key={row.id}
          sx={{ cursor: "pointer" }}
        />
      );
    },
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <EnhancedTableHead
        numSelected={selected.length}
        sortType={sortType}
        orderBy={orderBy}
        onSelectAllClick={handleSelectAllClick}
        onRequestSort={handleRequestSort}
        onFilterChange={handleFilterUpdate}
        rowCount={tasks.length}
      />
    );
  }

  function rowContent(_index: number, row: ShortTask) {
    const isItemSelected = selected.includes(row.id);
    const labelId = `enhanced-table-checkbox-${_index}`;

    return (
      <>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
            onClick={(event: React.MouseEvent<unknown>) => {
              event.stopPropagation(); // this prevents the edit task modal from opening when we don't want it to
            }}
            onChange={(event) => handleSelectClick(event, row.id)}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
          >
            {row[headCell.id]}
          </TableCell>
        ))}
      </>
    );
  }

  return (
    <>
      <Paper sx={{ height: 400, width: "100%" }}>
        <EnhancedTableToolbar
          handleAddTaskClick={() => setNewTask(true)}
          numSelected={selected.length}
          handleDelete={handleDelete}
          deleting={deleting}
          deleteStatus={deleteStatus}
        />
        <TableVirtuoso
          data={tasks}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={deleting}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
      <BasicModal open={newTask} setOpen={setNewTask}>
        <AddOrEditTask />
      </BasicModal>
      <BasicModal
        open={!!activeTask}
        setOpen={(open) => (!open ? setActiveTask(undefined) : undefined)}
      >
        {activeTask && <AddOrEditTask id={activeTask} />}
      </BasicModal>
    </>
  );
}
