import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "80vh",
  display: "flex",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type BasicModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function BasicModal({
  open,
  setOpen,
  children,
}: React.PropsWithChildren<BasicModalProps>) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 0,
              top: 0,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          {children}
        </Box>
      </Modal>
    </div>
  );
}
