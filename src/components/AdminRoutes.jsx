// import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";
const AdminRoutes = () => {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;
  return adminInfo ? <Outlet /> : <Navigate to="/admin/signin" />;
};

export default AdminRoutes;