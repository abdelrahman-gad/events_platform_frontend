// import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ManagerRoutes = () => {
  const managerSignin = useSelector((state) => state.managerSignin);
  const { managerInfo } = managerSignin;
  const location = useLocation();
  return managerInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/manager/signin" replace state={{ from: location }} />
  );
};

export default ManagerRoutes;
