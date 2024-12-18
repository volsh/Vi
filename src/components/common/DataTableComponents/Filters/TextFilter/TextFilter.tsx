import { Input, InputProps, Paper } from "@mui/material";
import { debounce } from "lodash-es";
import { renderFilterProps } from "../../../../../../@types/common";

type TextFilterProps = Omit<renderFilterProps, "value"> & {
  value?: string;
  onChange: (value: string) => void;
} & InputProps;

export default function TextFilter({
  onChange,
  value = "",
  placeholder,
}: TextFilterProps) {
  const handleChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = event;

      onChange(value);
    },
    500
  );

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: "5px",
        borderColor: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <Input
        type="search"
        defaultValue={value}
        onChange={handleChange}
        placeholder={placeholder || "Search..."}
      />
    </Paper>
  );
}
