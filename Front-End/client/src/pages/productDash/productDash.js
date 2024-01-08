import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import UseApi from "../../hooks/useApi";
import TableComponent from "../../components/Table/table";
import AddIcon from "@mui/icons-material/Add";

const ProductDash = () => {
  const [data, setData] = useState([]);
  const { apiCall, loading, error } = UseApi();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [successAdd, setSuccessAdd] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall({
          method: "get",
          url: "product",
        });
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
    setOpenDelete(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleSuccessAdd = () => {
    setSuccessAdd(true);
  };

  const handleSuccessEdit = () => {
    setSuccessEdit(true);
  };

  const handleSuccessDelete = () => {
    setSuccessDelete(true);
  };

  return (
    <Box width="90%" margin="5rem auto">
      <Typography
        variant="h3"
        component="h3"
        sx={{
          textAlign: "left",
          mb: 5,
          mt: "5rem",
          fontWeight: "bold",
        }}
      >
        Manage Products
      </Typography>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Loading...</Typography>
        </div>
      ) : error ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="error">
            Error loading data
          </Typography>
        </div>
      ) : (
        <>
          <Grid
            container
            md={11.8}
            justifyContent="space-between"
            sx={{
              "& .MuiGrid2-root": {
                display: "flex",
                alignContent: "space-between",
                justifyContent:
                  screenWidth > 1200 ? "space-between" : "flex-start",
              },
              "& .MuiGrid2-container": {
                mb: "2rem",
                alignContent: "space-between",
              },
            }}
          >
            <span
              style={{
                width: "fit-content",
              }}
              onClick={handleOpen}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddIcon />}
                sx={{
                  bgcolor: "#9370DB !important",
                }}
              >
                Add Product
              </Button>
            </span>
            <TableComponent
              data={data}
              isEdit={true}
              ForWhat={"product"}
              handleEditOpen={handleEditOpen}
              setSelectedRowData={setSelectedRowData}
              handleOpenDelete={handleOpenDelete}
            />
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ProductDash;
