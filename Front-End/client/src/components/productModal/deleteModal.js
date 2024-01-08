import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import UseApi from "../../hookes/useApi";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({
  open,
  handleClose,
  selectedRowData,
  setSuccessDelete,
}) => {
  const { apiCall, loading, error } = UseApi();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await apiCall({
        url: "/product",
        method: "delete",
        data: {
          id: selectedRowData && selectedRowData.id,
        },
      });
      setSuccessDelete(true);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSuccessDelete(false);
      }, 20000);
      handleClose();
    }
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
  };

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "25rem",
    paddingBottom: "1rem",
  };

  const span = {
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: 0,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={divStyle}>
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color: "#088395 !important",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Alert
            </Typography>
            <IconButton
              style={span}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon
                sx={{
                  color: "#9370DB",
                }}
              />
            </IconButton>
          </div>
          <Typography
            variant="p"
            component="p"
            fontSize="1.3rem"
            sx={{
              mb: "2rem",
              mt: "1.5rem",
            }}
          >
            Are you sure you want to delete this product
          </Typography>
          <span
            style={{
              display: "flex",
              marginTop: "2rem",
            }}
            onClick={(e) => handleDelete(e)}
          >
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              size="large"
              sx={{
                bgcolor: "#9370DB !important",
                ':hover' :{
                    bgcolor: '8059ce'
                }
              }}
              onClick={(e) => handleDelete(e)}
            >
              Delete
            </Button>
          </span>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteModal;
