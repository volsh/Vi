import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { createTask, fetchTask, updateTask } from "../../api/tasksApi";
import {
  PriorityTypes,
  StatusTypes,
  TaskView,
} from "../../../typings/taskTypes";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import FormControl from "../common/FormControl/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/system";
import ChipsArray, { ChipData } from "../common/Chips/Chips";
import { convertCreationTimeToTaskView } from "../../utils/taskUtils";

type EditTaskProps = { id?: number };

export default function AddOrEditTask({ id }: EditTaskProps) {
  const [task, setTask] = useState<TaskView>();
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [savingStatus, setSavingStatus] = useState<"success" | "error">();

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity()) {
      const formData = new FormData(event.currentTarget);
      const obj = { ...Object.fromEntries(formData), tags: task?.tags };
      setSaving(true);
      const action = !!id ? updateTask : createTask;

      action(obj as unknown as TaskView)
        .then(() => {
          setSavingStatus("success");
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

  const chipTags = useMemo(
    () => task?.tags?.map((tag) => ({ label: tag })),
    [task]
  );

  const handleAddTag = useCallback(
    (chip: ChipData) => {
      setTask((prev) => {
        if (prev) {
          return {
            ...prev,
            tags: [...prev.tags, chip.label],
          };
        }
        return { tags: [chip.label] };
      });
    },
    [setTask]
  );

  const handleDeleteTag = useCallback(
    (chip: ChipData) => {
      setTask((prev) => {
        if (prev) {
          return {
            ...prev,
            tags: prev.tags.filter((tag) => tag !== chip.label),
          };
        }
        return prev;
      });
    },
    [setTask]
  );

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchTask(id)
        .then((task) => {
          setTask(task);
        })
        .catch((err) => {
          console.log(`failed to fetch task ${id} - ${err}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

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
            {task && <input name="id" type="hidden" value={task?.id} />}
            <FormControl
              name="title"
              value={task?.title}
              label="Title"
              required
            />
            <FormControl
              name="description"
              value={task?.description}
              label="Description"
            />
            <FormControl
              name="dueDate"
              value={task?.dueDate}
              label="Due date"
              type="date"
              required
            />
            <FormControl
              name="status"
              value={task?.status}
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
              name="taskOwner"
              value={task?.taskOwner}
              label="Task Owner"
              required
            />
            <FormControl
              name="priority"
              value={task?.priority}
              label="Priority"
              type="select"
              required
              selectOptions={PriorityTypes.map((priorityType) => ({
                id: priorityType,
                value: priorityType,
                label: priorityType,
              }))}
            />
            <ChipsArray
              chips={chipTags as ChipData[]}
              onDeleteChip={handleDeleteTag}
              onAddChip={handleAddTag}
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
