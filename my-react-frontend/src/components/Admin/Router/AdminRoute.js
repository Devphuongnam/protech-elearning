import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

const AdminRoute = ({ element: Element, ...rest }) => {
  // Kiểm tra xem có token của admin trong localStorage không
  const isAdminAuthenticated = localStorage.getItem("adminToken");

  return (
    <Routes>
      <Route
        {...rest}
        element={
          isAdminAuthenticated ? <Element /> : <Navigate to="/admin/login" />
        }
      />
    </Routes>
  );
};

export default AdminRoute;
