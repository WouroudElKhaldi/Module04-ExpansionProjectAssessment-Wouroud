import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import loadingd from "../assets/loading.gif";
import { AuthContext } from "../context/authContext";
import Layout from "./layout";
import ProductPage from "../pages/productPage/productPage";
import ProductDetails from "../pages/productDetails/productDetails";
import ProductDash from "../pages/productDash/productDash";
import Unauthorized from "../pages/unauthorized/unauthorized";
import NotFound from "../pages/notFound/notFound";
import Login from "../pages/login/login";
import SignUp from "../pages/signUp/signUp";

const PrivateRoute = ({ element, roles }) => {
  const { user } = useContext(AuthContext);

  if (user === null) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={loadingd}
          style={{
            width: "15rem",
            height: "15rem",
            scale: "1",
          }}
          alt="loading"
        />
      </div>
    );
  } else {
    if (user && roles && roles.includes(user.role)) {
      return element;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  }
};

const AppRouter = () => {
  const { checkUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (checkUser) {
      setLoading(true);
    } else if (checkUser === false) {
      setLoading(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Layout>
              <ProductPage />
            </Layout>
          }
        />
        <Route
          path="/product/:productId?"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={
                <Layout>
                  <ProductDash />
                </Layout>
              }
              roles={["Product Creator"]}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
