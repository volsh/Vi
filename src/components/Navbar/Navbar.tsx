import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton/LogoutButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useState } from "react";

function Navbar() {
  const { isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link sx={{ color: "white" }} href="#">
          Vi App
        </Link>
        {isAuthenticated && (
          <>
            <IconButton
              onClick={toggleMenu}
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {isAuthenticated && (
                <MenuItem>
                  <Link aria-current="page" href="/">
                    Home
                  </Link>
                </MenuItem>
              )}
              {isAuthenticated && (
                <MenuItem>
                  <LogoutButton />
                </MenuItem>
              )}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
