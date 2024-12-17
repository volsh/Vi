import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ClickAwayListener, Popper } from "@mui/material";
import { Filter } from "../../../../../../@types/common";

export type renderFilterProps = {
  field: string;
  value?: unknown;
  onChange: (value: unknown) => void;
  anchorEl: Element | null;
  open: boolean;
};

type FilterComponentProps = {
  field: string;
  filterValue?: unknown | unknown[];
  filterFunction: (filter: Filter) => void;
  renderFilter: (
    props: renderFilterProps
  ) => React.ReactElement;
};

export default function FilterComponent({
  field,
  filterValue,
  filterFunction,
  renderFilter,
}: FilterComponentProps) {
  const [popperAnc, setPopperAnc] = React.useState<Element | null>(null);

  const popperOpen = Boolean(popperAnc);

  const handleClickAway = () => {
    setPopperAnc(null);
  };
  const handleFilterClick = (e: React.MouseEvent) => {
    setPopperAnc(e.currentTarget);
  };
  return (
    <>
      <IconButton size="small" onClick={handleFilterClick}>
        <FilterListIcon sx={{ fontSize: "1em", background: "none" }} />
      </IconButton>
      <Box sx={{ position: "absolute", zIndex: 1 }}>
        <Popper open={popperOpen} anchorEl={popperAnc}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              {popperOpen &&
                renderFilter({
                  field,
                  value: filterValue,
                  onChange: (value: unknown) =>
                    filterFunction({ [field]: value }),
                  anchorEl: popperAnc,
                  open: popperOpen,
                })}
            </div>
          </ClickAwayListener>
        </Popper>
      </Box>
    </>
  );
}
