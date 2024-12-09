import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { ReactElement } from "react";

export type ChipData = {
  key?: number;
  label: string;
  icon?: ReactElement;
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

type ChipsArrayProps = {
  chips: Array<ChipData>;
  onAddChip: (chip: ChipData) => void;
  onDeleteChip: (chip: ChipData) => void;
};

const ChipsArray = ({ chips, onAddChip, onDeleteChip }: ChipsArrayProps) => {
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
      {chips?.map((chip) => {
        return (
          <ListItem key={chip.key || chip.label}>
            <Chip
              icon={chip.icon}
              label={chip.label}
              onDelete={() => onDeleteChip(chip)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
};

export default ChipsArray;
