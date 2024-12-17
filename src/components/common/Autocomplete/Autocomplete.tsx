import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import MuiAutocomplete, {
  AutocompleteClasses,
  AutocompleteProps as MuiAutocompleteProp,
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import {
  ComponentsOverrides,
  createTheme,
  CssVarsTheme,
  styled,
  ThemeProvider,
} from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export type AutocompleteOptionType = {
  id?: string;
  label?: string;
  [key: string]: unknown;
};

export type AutocompleteProps = {
  idField?: string;
  labelField?: string;
  placeholder?: string;
  styleOverrides?: Partial<
    OverridesStyleRules<keyof AutocompleteClasses, "MuiAutocomplete">
  >;
  textFieldProps?: TextFieldProps;
} & Omit<
  MuiAutocompleteProp<unknown, boolean, boolean, boolean>,
  "renderInput"
>;

export default function Autocomplete({
  options,
  loading,
  idField = "id",
  labelField = "label",
  placeholder = "Select...",
  value = "",
  styleOverrides,
  textFieldProps,
  multiple,
  ...rest
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiAutocomplete
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        options={options}
        value={value}
        isOptionEqualToValue={(option, value) => {
          const customOption = option as AutocompleteOptionType;
          const customValue = value as AutocompleteOptionType;

          return typeof option === "object"
            ? customOption[idField] === customValue[idField]
            : option === value;
        }}
        getOptionLabel={(option) => {
          const customOption = option as AutocompleteOptionType;
          return typeof option === "object"
            ? (customOption[labelField] as string)
            : String(option);
        }}
        inputMode="search"
        multiple={multiple}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              label={!value ? placeholder : undefined}
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                },
              }}
              {...textFieldProps}
            />
            {textFieldProps?.name && (
              <input
                type="hidden"
                name={textFieldProps.name}
                value={
                  value
                    ? multiple
                      ? (value as AutocompleteOptionType[])
                          .map((item) => item[idField])
                          .join(",")
                      : ((value as AutocompleteOptionType)[idField] as number)
                    : ""
                }
              />
            )}
          </>
        )}
        filterSelectedOptions={options.length > 1} // only show the selected option in the list if it is the only one in the list
        {...rest}
      />
    </ThemeProvider>
  );
}
