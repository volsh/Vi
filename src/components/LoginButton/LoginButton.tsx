import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "100px",
        }}
      >
        <Button variant="contained" onClick={() => loginWithRedirect()}>
          {" "}
          Log In
        </Button>
      </Box>
    );
  }
};

export default LoginButton;
