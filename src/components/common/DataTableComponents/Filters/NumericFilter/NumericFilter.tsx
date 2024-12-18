import { InputProps, Paper } from "@mui/material";
import { renderFilterProps } from "../../../../../../@types/common";
import NumberInput from "../../../Inputs/NumberInput/NumberInput";

type NumericFilterProps = Omit<renderFilterProps, "value"> & {
  value?: number;
  onChange: (value: number | null) => void;
} & InputProps;

export default function NumericFilter({ onChange, value }: NumericFilterProps) {
  const handleChange = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.PointerEvent
      | React.KeyboardEvent,
    value: number | null
  ) => {
    onChange(value);
  };

  return (
    // <Paper
    //   variant="outlined"
    //   sx={{
    //     marginTop: "30px",
    //     padding: "5px",
    //     borderColor: "rgba(0, 0, 0, 0.2)",
    //   }}
    // >
    <NumberInput defaultValue={value} onChange={handleChange} />
    // </Paper>
  );
}
