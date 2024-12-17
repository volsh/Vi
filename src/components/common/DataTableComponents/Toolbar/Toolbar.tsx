import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

interface TableToolbarProps {
  handleAddTaskClick: () => void;
  numSelected: number;
  handleDelete: () => void;
  clearFilters: () => void;
  hasFilters: boolean;
  deleting: boolean;
  deleteStatus: "success" | "error" | undefined;
}
export default function TableToolbar(props: TableToolbarProps) {
  const {
    handleAddTaskClick,
    numSelected,
    handleDelete,
    clearFilters,
    hasFilters,
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
        {hasFilters && (
          <Tooltip title="Clear filters">
            <IconButton onClick={clearFilters}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
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
