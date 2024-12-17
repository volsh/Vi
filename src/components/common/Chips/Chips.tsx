import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { ReactElement } from "react";

export type ChipData = {
  id?: unknown;
  label?: string;
  icon?: ReactElement;
  [key: string]: unknown;
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

type ChipsArrayProps = {
  chips?: Array<ChipData>;
  idField?: string;
  labelField?: string;
  onChange?: (chip: ChipData) => void;
  onDeleteChip?: (chip: ChipData) => void;
};

const ChipsArray = ({
  chips = [],
  // onAddChip,
  onDeleteChip,
  idField = "id",
  labelField = "label",
}: ChipsArrayProps) => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chips.map((chip) => {
        return (
          <ListItem
            key={
              typeof chip === "object"
                ? (chip[idField] as string) || (chip[labelField] as string)
                : chip
            }
          >
            <Chip
              icon={chip.icon}
              label={
                typeof chip === "object" ? (chip[labelField] as string) : chip
              }
              onDelete={() => onDeleteChip && onDeleteChip(chip)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
};

export default ChipsArray;
