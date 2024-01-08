import { React, useContext, useEffect, useState } from "react";
import {
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import UseApi from "../../hooks/useApi";
import { AuthContext } from "../../context/authContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import video from "../../assets/Login.mp4";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const handleResize = () => {
      const newWid = window.innerWidth;
      setScreenWidth(newWid);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { apiCall, error, loading } = UseApi();
  const { fetchUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [image, setImage] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      console.log("enter email and password");
    }
    try {
      const response = await apiCall({
        url: "/user",
        method: "post",
        data: { email, password, fullName, image, role },
      });
      await fetchUserData();
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  return (
    <div
      style={{
        display: "flex",
        margin: screenWidth < 500 ? 0 : screenWidth < 1000 ? "5rem 0" : 0,
        flexDirection: screenWidth < 1000 ? "column-reverse" : "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: screenWidth < 500 ? "none" : "flex",
        }}
      >
        <video id="vid" width="100%" autoPlay muted>
          {" "}
          <source src={video} type="video/mp4" />
          Your Browser does not support this video tag.
        </video>
      </Box>
      <Box
        sx={{
          width:
            screenWidth < 300 ? "200px" : screenWidth < 520 ? "300px" : "400px",
          "& .MuiFormControl-root": {
            mt: 2,
            mb: 2,
            ml: 0,
            mr: 0,
          },
          "& .MuiInputBase-root": {
            color: "black",
          },
          "& .MuiFormLabel-root ": {
            color: "black",
          },
          "& .MuiBox-root css-3b5rqz": {
            margin: "2rem !important",
          },
          "& .MuiSvgIcon-root": {
            color: "#9370DB",
          },
          "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
            border: "2px solid #9370DB !important",
            borderRadius: "4px",
          },
          "& .Mui-focused > .MuiOutlinedInput-notchedOutline > legend": {
            color: "#9370DB !important",
          },
          "& .MuiInputLabel-root.Mui-focused ": {
            color: "#9370DB",
          },
          "& .MuiButtonBase-root": {
            height: "3rem !important",
          },
        }}
      >
        <Typography component="h4" variant="h4" fontWeight="bold" mb="1rem">
          Create an account
        </Typography>
        <Stack flexDirection={screenWidth < 300 ? "column" : "row"} spacing={1}>
          <Typography variant="h6" component="h6">
            Already have an account?
          </Typography>
          <Link
            to="/login"
            style={{
              width: "fit-content",
              textDecoration: "none",
            }}
          >
            <Typography
              variant="p"
              component="p"
              width="fit-content"
              color="#9370DB"
              ml="0.5rem"
            >
              Log in
            </Typography>
          </Link>
        </Stack>
        <form
          method="post"
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack spacing={3} mb="1.5rem" mt="1.5rem">
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <FormControl
              required
              sx={{
                m: 1,
                "& .MuiSvgIcon-root": {
                  color: "white",
                  "& .MuiList-root": {
                    bgcolor: "transparent",
                  },
                },
              }}
            >
              <InputLabel id="demo-simple-select-required-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={role}
                name="role"
                label="Role *"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem disabled>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"User"}>User</MenuItem>
                <MenuItem value={"Product Creator"}>Product Creator</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                m: 1,
                "& .MuiSvgIcon-root": {
                  color: "#9370DB",
                },
                width: "100%",
                "&:focus": {
                  borderColor: "#9370DB",
                },
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password*
              </InputLabel>
              <OutlinedInput
                fullWidth
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      style={{ color: "white" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Stack>
          {loading ? (
            <LoadingButton variant="contained" size="large" loading>
              Loading
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "#9370DB",
                ":hover": {
                  bgcolor: "#035e6b",
                },
              }}
            >
              Sign up
            </Button>
          )}
        </form>
      </Box>
    </div>
  );
};

export default SignUp;
