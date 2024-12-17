import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { PriorityTypes, StatusTypes, Task } from "../../../@types/task";
import { Filter } from "../../../@types/common";
import { deleteTasks } from "../../api/tasksApi";
import BasicModal from "../common/BasicModal/BasicModal";
import AddOrEditTask from "../AddOrEditTask/AddOrEditTask";
import { Backdrop, CircularProgress } from "@mui/material";
import MultipleSelectFilter, {
  SelectItem,
} from "../common/DataTableComponents/Filters/MultipleSelectFilter/MultipleSelectFilter";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValueLoadable,
} from "recoil";
import { tasksQuery, tasksRequest } from "../../recoil/tasks";
import TableToolbar from "../common/DataTableComponents/Toolbar/Toolbar";
import DataTableHead, {
  HeadCell,
} from "../common/DataTableComponents/TableHead/TableHead";
import { renderFilterProps } from "../common/DataTableComponents/Filters/Filter/Filter";

type TaskHeadCell = Omit<HeadCell, "id"> & {
  id: keyof Task;
};

const headCells: readonly TaskHeadCell[] = [
  {
    id: "id",
    numeric: true,
    label: "ID",
  },
  {
    id: "title",
    numeric: false,
    label: "Title",
    hasFilter: true,
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
    hasFilter: true,
  },
  {
    id: "priority",
    numeric: false,
    label: "Priority",
    hasFilter: true,
  },
];

function renderTaskFilterComponent(props: renderFilterProps) {
  switch (props.field) {
    case "title":
    case "status":
      return (
        <MultipleSelectFilter
          {...props}
          value={props.value as unknown[]}
          items={
            StatusTypes.map((statusType) => ({
              value: statusType,
              label: statusType,
            })) as unknown as Array<SelectItem>
          }
        />
      );
    case "priority":
      return (
        <MultipleSelectFilter
          {...props}
          value={props.value as unknown[]}
          items={
            PriorityTypes.map((priorityType) => ({
              value: priorityType,
              label: priorityType,
            })) as unknown as Array<SelectItem>
          }
        />
      );
    default:
      return <div></div>;
  }
}

interface TasksTableContext {
  setActiveTask: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const VirtuosoTableComponents: TableComponents<Task, TasksTableContext> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      aria-labelledby="tableTitle"
      // stickyHeader
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow: (props) => {
    const { item: row, context } = props;

    const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
      context?.setActiveTask(row.id);
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

export default function TasksList() {
  const [selected, setSelected] = React.useState<number[]>([]);
  const [activeTask, setActiveTask] = React.useState<number>();
  const [newTask, setNewTask] = React.useState<boolean>(false);
  const [deleting, setDeleting] = React.useState<boolean>(false);
  const [deleteStatus, setDeleteStatus] = React.useState<"success" | "error">();

  const [requestBody, setRequestBody] = useRecoilState(tasksRequest);

  const tasksLoadable = useRecoilValueLoadable(tasksQuery);

  const tasks =
    tasksLoadable.state === "hasValue"
      ? (tasksLoadable.contents as Task[])
      : [];
  const loading = tasksLoadable.state === "loading";

  const refreshTasks = useRecoilRefresher_UNSTABLE(tasksQuery);

  const handleDelete = () => {
    setDeleting(true);
    deleteTasks(selected)
      .then(({ ids }) => {
        setDeleteStatus("success");
        setSelected([]);
        refreshTasks();
        // setTasks((prev) => prev.filter((task) => !ids.includes(task.id)));
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
    property: string
  ) => {
    setRequestBody((prev) => ({
      ...prev,
      sort: {
        field: property,
        type:
          prev.sort && prev.sort.field === property && prev.sort.type === "asc"
            ? "desc"
            : "asc",
      },
    }));
  };

  const handleFilterUpdate = (filter: Filter) => {
    setRequestBody((prev) => ({
      ...prev,
      filters: { ...prev.filters, ...filter },
    }));
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

  function fixedHeaderContent() {
    return (
      <DataTableHead
        numSelected={selected.length}
        sortType={requestBody?.sort?.type}
        orderBy={requestBody?.sort?.field}
        filters={requestBody?.filters}
        onSelectAllClick={handleSelectAllClick}
        onRequestSort={handleRequestSort}
        onFilterChange={handleFilterUpdate}
        rowCount={tasks.length}
        headCells={headCells as HeadCell[]}
        renderFilter={renderTaskFilterComponent}
      />
    );
  }

  function rowContent(_index: number, row: Task) {
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
            {row[headCell.id] as React.ReactNode}
          </TableCell>
        ))}
      </>
    );
  }

  return (
    <>
      <Paper sx={{ height: 400, width: "100%" }}>
        <TableToolbar
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
          context={{ setActiveTask }}
        />
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading || deleting}
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
