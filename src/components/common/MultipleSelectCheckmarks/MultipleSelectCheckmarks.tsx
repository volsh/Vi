import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export type SelectItem = { value: "number" | "string"; label: string };

type MultipleSelectCheckmarksProps = {
  items: Array<SelectItem>;
  label: string;
  open: boolean;
  onChange: (selected: Array<string>) => void;
};

export default function MultipleSelectCheckmarks({
  items,
  label,
  open,
  onChange,
}: MultipleSelectCheckmarksProps) {
  const [totalValue, setTotalValue] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof totalValue>) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const totalValue = typeof value === "string" ? value.split(",") : value;
    onChange(totalValue);
    setTotalValue(totalValue);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={totalValue}
          open={open}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <Checkbox checked={totalValue.includes(item.label)} />
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
