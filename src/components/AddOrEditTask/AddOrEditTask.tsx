import { FormEvent, useEffect, useMemo, useState } from "react";
import { createTask, fetchTask, updateTask } from "../../api/tasksApi";
import {
  PriorityTypes,
  StatusTypes,
  Task,
  TaskView,
} from "../../../@types/task";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import FormControl from "../common/FormControl/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/system";
import { convertCreationTimeToTaskView } from "../../utils/taskUtils";
import UserSelect from "../UserSelect/UserSelect";
import Tags from "../Tags/Tags";
import { tasksQuery } from "../../recoil/tasks";
import { useRecoilRefresher_UNSTABLE } from "recoil";

type EditTaskProps = { id?: number };

export default function AddOrEditTask({ id }: EditTaskProps) {
  const [task, setTask] = useState<TaskView>({} as TaskView);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [savingStatus, setSavingStatus] = useState<"success" | "error">();

  const refreshTasks = useRecoilRefresher_UNSTABLE(tasksQuery);

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity()) {
      const formData = new FormData(event.currentTarget);
      const formEntries = Object.fromEntries(formData) as unknown as Task;
      const obj: Task = {
        ...formEntries,
        id: parseInt(formEntries.id as unknown as string),
        taskOwnerId: parseInt(formEntries.taskOwnerId as unknown as string),
        tagIds: formEntries.tagIds
          ? (formEntries.tagIds as unknown as string)
              .split(",")
              .map((tagId) => parseInt(tagId))
          : [],
      };
      setSaving(true);
      const action = !!id ? updateTask : createTask;

      action(obj)
        .then(() => {
          setSavingStatus("success");
          refreshTasks();
        })
        .catch((err) => {
          console.log(`failed to save task ${err}`);
          setSavingStatus("error");
        })
        .finally(() => {
          setSaving(false);
          setTimeout(() => {
            setSavingStatus(undefined);
          }, 3000);
        });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (id) {
      setLoading(true);
      fetchTask(id, abortController) // we pass abortController due to the react double useEffect invoke on dev mode behaviour
        .then((task) => {
          setTask(task);
        })
        .catch((err) => {
          if (err.name !== "CanceledError") {
            console.log(`failed to fetch task ${id} - ${err}`);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    return () => abortController.abort();
  }, [id]);

  const initialUserOptions = useMemo(() => {
    return task?.taskOwner ? [task.taskOwner] : [];
  }, [task?.taskOwner]);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {savingStatus && (
            <>
              {savingStatus === "error" ? (
                <Alert severity="error">
                  Failed to save task. Please try again later
                </Alert>
              ) : (
                <Alert severity="success">Task was successfully saved</Alert>
              )}
            </>
          )}
          <Typography
            variant="h2"
            sx={{
              fontSize: "2rem",
              marginBottom: "5px",
              alignSelf: "center",
            }}
          >
            {!!id ? "Update Task" : "Create Task"}
          </Typography>
          <StyledForm onSubmit={handleSave} noValidate>
            {task.id && <input name="id" type="hidden" value={task.id} />}
            <FormControl
              name="title"
              value={task.title}
              label="Title"
              required
            />
            <FormControl
              name="description"
              value={task.description}
              label="Description"
            />
            <FormControl
              name="dueDate"
              value={task.dueDate}
              label="Due date"
              type="date"
              required
            />
            <FormControl
              name="status"
              value={task.status}
              label="Status"
              type="select"
              required
              selectOptions={StatusTypes.map((statusType) => ({
                id: statusType,
                value: statusType,
                label: statusType,
              }))}
            />
            <FormControl
              name="creationTime"
              value={
                task
                  ? task.creationTime
                  : convertCreationTimeToTaskView(new Date().toISOString())
              }
              label="Creation Time"
              type="datetime-local"
              required
              readOnly
            />
            <FormControl
              name="taskOwnerId"
              value={task.taskOwner}
              label="Task Owner"
              required
              renderCustomInput={(props) => (
                <UserSelect options={initialUserOptions} {...props} />
              )}
            />
            <FormControl
              name="priority"
              value={task.priority}
              label="Priority"
              type="select"
              required
              selectOptions={PriorityTypes.map((priorityType) => ({
                id: priorityType,
                value: priorityType,
                label: priorityType,
              }))}
            />
            <FormControl
              name="tagIds"
              value={task.tags || []}
              label="Tags"
              renderCustomInput={(props) => <Tags {...props} />}
            />
            <LoadingButton
              loading={saving}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              type="submit"
              sx={{ width: "fit-content", alignSelf: "center" }}
            >
              Save
            </LoadingButton>
          </StyledForm>
        </>
      )}
    </Box>
  );
}

const StyledForm = styled("form")(
  ({ theme }) => `
    max-height: 100%;
    overflow: auto;
    padding: 0 40px 0 5px;
        display: flex;
    flex-direction: column;
    gap: 15px;
     `
);
