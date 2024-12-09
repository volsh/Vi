import { Box, Typography } from "@mui/material";
import TasksList from "../TasksList/TasksList";

export default function TaskManager() {
  return (
    <Box>
      <Typography variant="h1" sx={{ fontSize: "2.5rem", padding: "10px 0" }}>
        Task Manager
      </Typography>
      <Box sx={{ display: "flex" }}>
        <TasksList />
      </Box>
    </Box>
  );
}
