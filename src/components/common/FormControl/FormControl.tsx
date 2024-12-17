import * as React from "react";
import {
  FormControl,
  FormControlState,
  useFormControlContext,
} from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { Select, selectClasses } from "@mui/base/Select";
import { SelectOption } from "@mui/base";
import { styled } from "@mui/system";
import clsx from "clsx";
import { InputLabel, MenuItem, NativeSelect } from "@mui/material";

type FormControlProps = {
  required?: boolean;
  type?: React.HTMLInputTypeAttribute | "select";
  name: string;
  label?: string;
  value: unknown;
  readOnly?: boolean;
  selectOptions?: Array<
    Omit<SelectOption<string | number | readonly string[] | undefined>, "ref">
  >;
  renderCustomInput?: (props?: {
    [key: string]: unknown;
  }) => React.ReactElement;
};

export default function FormControlComponent({
  required,
  name,
  label,
  value: initialValue = "",
  type,
  readOnly,
  selectOptions,
  renderCustomInput,
  ...rest
}: FormControlProps) {
  const [value, setValue] = React.useState<unknown>(initialValue);
  const [focused, setFocused] = React.useState<boolean>();

  React.useEffect(() => {
    if (!value) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleChange = (value: unknown) => {
    setValue(value || "");
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
  };
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
  };

  const styleOverrides = {
    input: {
      variants: [
        {
          // `dashed` is an example value, it can be any name.
          props: { variant: "filled" },
          style: {
            boxShadow: "0 0 2px 2px rgb(125 200 0 / 0.25)",
          } as CSSStyleDeclaration,
        },
      ],
    },
  };

  return (
    <FormControl
      defaultValue=""
      required={required}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      style={{ position: "relative" }}
    >
      {({ filled }: FormControlState) => (
        <React.Fragment>
          <Label id={`label-${name}`}>{label || name}</Label>
          {renderCustomInput ? (
            <>
              {renderCustomInput({
                onChange: handleChange,
                value,
                styleOverrides,
                textFieldProps: {
                  // variant: filled ? "filled" : undefined,
                  name,
                },
              })}
            </>
          ) : type === "select" ? (
            <StyledSelect
              name={name}
              className={filled ? "filled" : ""}
              value={value}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                handleChange(event.target.value)
              }
            >
              {selectOptions?.map((option) => (
                <option key={option.id} value={option.value} id={option.id}>
                  {option.label || option.value}
                </option>
              ))}
            </StyledSelect>
          ) : (
            <StyledInput
              type={type}
              name={name}
              readOnly={readOnly}
              {...rest}
              className={filled ? "filled" : ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event.target.value)
              }
            />
          )}
          {filled && focused === false && <OkMark>✔</OkMark>}{" "}
          {/* should only appear after first blur and not on first render (when focused is undefined and not false) */}
        </React.Fragment>
      )}
    </FormControl>
  );
}

const StyledInput = styled(Input)(
  ({ theme }) => `
  display: inline-block;
    width: 100%;

  .${inputClasses.input} {
    width: 92%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
      &.filled {
      box-shadow: 0 0 2px 2px rgb(125 200 0 / 0.25);
      }
  }

  &.filled .${inputClasses.input} {
    box-shadow: 0 0 2px 2px rgb(125 200 0 / 0.25);
  }
`
);

const StyledSelect = styled(NativeSelect)(
  ({ theme }) => `
    display: inline-block;

      width: 100%;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[700] : grey[200]
      };
      box-shadow: 0 2px 2px ${
        theme.palette.mode === "dark" ? grey[900] : grey[50]
      };
  
      &:hover {
        border-color: ${blue[400]};
      }
  
      &:focus {
        outline: 0;
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${
          theme.palette.mode === "dark" ? blue[600] : blue[200]
        };
      }
  
    &.filled {
      box-shadow: 0 0 2px 2px rgb(125 200 0 / 0.25);
    }

    option {
        padding: 10px;
    }
  `
);

const OkMark = styled("span")`
  margin-left: 5px;
  position: absolute;
  top: 50%;
  left: 100%;
  color: rgb(125 200 0 / 1);
`;

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Label = styled(
  ({
    children,
    className,
    id,
  }: {
    children?: React.ReactNode;
    className?: string;
    id?: string;
  }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext?.filled]);

    if (formControlContext === undefined) {
      return <InputLabel id={id}>{children}</InputLabel>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
      <InputLabel
        id={id}
        className={clsx(className, error || showRequiredError ? "invalid" : "")}
      >
        {children}
        {required ? " *" : ""}
      </InputLabel>
    );
  }
)`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;
