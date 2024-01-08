import { Box, Typography } from "@mui/material";
import UseApi from "../../hooks/useApi";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import styles from "./productPage.module.css";
import Card from "../../components/card/card";

const ProductPage = () => {
  const { apiCall, loading, error } = UseApi();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiCall({
        method: "get",
        url: "/product",
      });
      setData(response);
    };
    fetchData()
  }, []);

  return (
    <Box
      sx={{
        width: "90%",
        margin: " 5rem auto",
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        fontWeight="700"
        fontFamily="Helvetica Neue"
        display="flex"
        justifyContent="flex-start"
        width="100%"
      >
        Our Products
      </Typography>
      <div className={styles.gridView}>
        {data &&
          data.map((item) => {
            return <Card key={data.id} data={data && data} />;
          })}
      </div>
    </Box>
  );
};

export default ProductPage;
