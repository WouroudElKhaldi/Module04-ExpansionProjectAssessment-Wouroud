import { useContext, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  IconButton,
  TextField,
  Button,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import { AuthContext } from "../../context/authContext";
import UseApi from "../../hookes/useApi";

const HotelModal = ({
  type,
  selectedRowData,
  open,
  handleClose,
  handleEditClose,
  setSuccessAdd,
  setSuccessEdit,
}) => {
  const { apiCall, loading, error } = UseApi();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setdescription] = useState("");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState();

  useEffect(() => {
    if (type === "edit" && selectedRowData) {
      setTitle(selectedRowData.title);
      setCategory(selectedRowData.category);
      setdescription(selectedRowData.description);
      setPrice(selectedRowData.price);
    }
  }, [type, selectedRowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "category") {
      setCategory(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "description") {
      setdescription(value);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall({
        url: "/product",
        method: "post",
        data: {
          title: title,
          category: category,
          description: description,
          price: price,
          supplier: supplier,
          userId: user.id,
        },
      });
      setSuccessAdd(true);
    } catch (error) {
      setSuccessAdd(false);
    } finally {
      handleClose();
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall({
        url: "/product",
        method: "patch",
        data: {
          id: selectedRowData.id,
          title: title,
          category: category,
          description: description,
          price: price,
          supplier: supplier,
          userId: user.id,
        },
      });
      setSuccessEdit(true);
    } catch (error) {
      setSuccessEdit(false);
    } finally {
      handleClose();

    }
  };

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "25rem",
    marginTop: "1.5rem",
  };

  const spanStyle = {
    display: "flex",
    alignItems: "center",
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    bgcolor: "white",
    border: "2px solid #171B24",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose ? handleClose : handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            sx={{
              "& .MuiFormControl-root": {
                mt: 2,
                mb: 2,
                ml: 0,
                mr: 0,
                width: "25rem",
              },
              "& .MuiInputBase-root": {
                color: "black",
              },
              "& .MuiFormLabel-root ": {
                color: "black",
              },
              "& .MuiOutlinedInput-root": {
                border: "black !important",
              },
              "& .MuiBox-root css-3b5rqz": {
                margin: "2rem !important",
              },
              "& .MuiSvgIcon-root": {
                color: "#9370DB",
              },
              "& .MuiButton-containedPrimary": {
                bgcolor: "#2D99EF",
                mt: "1rem",
                mb: "1rem",
              },
              "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
                border: "2px solid #9370DB !important",
                borderRadius: "4px",
              },
              "& .Mui-focused > .MuiOutlinedInput-notchedOutline > legend": {
                color: "#9370DB !important",
              },
            }}
            autoComplete="off"
          >
            <div style={divStyle}>
              {type === "add" ? (
                <Typography
                  variant="h4"
                  component="h4"
                  color="#9370DB"
                  sx={{
                    textAlign: "left",
                    mt: 3,
                    mb: 3,
                    ml: "8px",
                    width: "fit-content",
                    fontWeight: "bold",
                  }}
                >
                  Add Hotel
                </Typography>
              ) : (
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    textAlign: "left",
                    mt: 3,
                    mb: 3,
                    ml: "8px",
                    width: "fit-content",
                    fontWeight: "bold",
                  }}
                >
                  Edit Hotel
                </Typography>
              )}
              <IconButton
                style={spanStyle}
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <form onSubmit={type === "add" ? handleAdd : handleEdit}>
              <Stack>
                <TextField
                  required
                  id="outlined-required1"
                  label="Title"
                  placeholder="Titlw"
                  name="title"
                  onChange={(e) => handleChange(e)}
                  value={title}
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
                value={category}
                name="category"
                label="Category *"
                onChange={(e) => handleChange(e)}
              >
                <MenuItem disabled>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"User"}>User</MenuItem>
                <MenuItem value={"Product Creator"}>Product Creator</MenuItem>
              </Select>
            </FormControl>
                <TextField
                  required
                  id="outlined-required"
                  label="Price"
                  placeholder="Price"
                  name="price"
                  onChange={handleChange}
                  value={price}
                  type="number"
                />
                <TextField
                  required
                  id="outlined-required12"
                  label="Description"
                  placeholder="Description"
                  name="description"
                  onChange={handleChange}
                  value={description}
                />
                <div style={divStyle}>
                  <span
                    onClick={type === "add" ? handleAdd : handleEdit}
                  >
                    {loading === true ? (
                      <LoadingButton variant="contained" size="large" loading>
                        Loading
                      </LoadingButton>
                    ) : (
                      <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        sx={{
                          ":hover": {
                            bgcolor: "#035e6b !important",
                          },
                          bgcolor: "#9370DB !important",
                        }}
                      >
                        Submit
                      </Button>
                    )}
                  </span>
                </div>
              </Stack>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default HotelModal;
