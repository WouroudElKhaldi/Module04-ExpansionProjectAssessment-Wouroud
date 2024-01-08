import { Box, Button, Typography } from "@mui/material";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import UseApi from "../../hooks/useApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { apiCall } = UseApi();
  const handlelogOut = async () => {
    try {
      await apiCall({
        url: "auth/logout",
        method: "post",
      });
      setUser(null);
      //  toast.success("Logged out Successfully!")
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        width: "90%",
        margin: "2rem auto",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h1" component="h1" fontSize="2rem" color="#9370DB">
        E-Commerce
      </Typography>
      {!user && (
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            columnGap: "1rem",
          }}
        >
          <Link to="/signUp" className={styles.link}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#9370DB",
                ":hover": {
                  bgcolor: "#8059ce",
                },
              }}
            >
              Sign up
            </Button>
          </Link>
          <Link to="/logIn" className={styles.link}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#9370DB",
                ":hover": {
                  bgcolor: "#8059ce",
                },
              }}
            >
              Login
            </Button>
          </Link>
        </span>
      )}
      {user && (
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            columnGap: "1rem",
          }}
        >
          {user.role === "Product Creator" && (
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#9370DB",
                  ":hover": {
                    bgcolor: "#8059ce",
                  },
                }}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
          )}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#9370DB",
              ":hover": {
                bgcolor: "#8059ce",
              },
            }}
            onClick={handlelogOut}
          >
            Logout
          </Button>
        </span>
      )}
    </Box>
  );
};
export default Navbar;
