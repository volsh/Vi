import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Input } from "@mui/material";
import { renderFilterProps } from "../../../../../../@types/common";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export type SelectItem = { value: "number" | "string"; label: string };

type MultipleSelectFilterProps = Omit<
  renderFilterProps,
  "value" | "onChange"
> & {
  items: Array<SelectItem>;
  value?: unknown[];
  onChange: (value: unknown[]) => void;
} & SelectProps;

export default function MultipleSelectFilter({
  items,
  open,
  onChange,
  value = [],
  anchorEl,
}: MultipleSelectFilterProps) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    onChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Select
      multiple
      value={value.map(String)}
      open={open}
      onChange={handleChange}
      input={
        <Input
          slotProps={{
            root: {
              sx: {
                minWidth: "200px",
                height: 0,
                "::before": {
                  border: 0,
                },
              },
            },
          }}
        />
      }
      renderValue={(selected) => selected.join(", ")}
      autoWidth
      MenuProps={{
        disablePortal: true,
        anchorEl,
        slotProps: {
          paper: {
            sx: {
              position: "absolute",
              left: "0 !important",
              top: "0 !important",
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            },
          },
        },
      }}
    >
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          <Checkbox checked={value?.includes(item.label)} />
          <ListItemText primary={item.label} />
        </MenuItem>
      ))}
    </Select>
  );
}
