import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ClickAwayListener, Popper } from "@mui/material";
import { Filter, renderFilterProps } from "../../../../../../@types/common";

type FilterComponentProps = {
  field: string;
  filterValue?: unknown | unknown[];
  filterFunction: (filter: Filter) => void;
  renderFilter: (props: renderFilterProps) => React.ReactElement;
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
        <FilterListIcon
          sx={{
            fontSize: "1em",
            background: "none",
            opacity: filterValue ? 1 : 0.5,
          }}
        />
      </IconButton>
      <Box sx={{ position: "absolute", zIndex: 1 }}>
        <Popper
          open={popperOpen}
          anchorEl={popperAnc}
          sx={{ marginTop: "30px !important" }}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              {popperOpen &&
                renderFilter({
                  field,
                  value: filterValue,
                  onChange: filterFunction,
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
