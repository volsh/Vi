import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <Button
          variant="contained"
          sx={{ margin: "auto" }}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          {" "}
          Log Out
        </Button>
        <br />
      </>
    );
  }
};

export default LogoutButton;
