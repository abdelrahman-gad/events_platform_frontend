import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {   useNavigate , useLocation } from "react-router-dom";
import { adminSigninAction } from "./../../redux/actions/adminActions";
import LoadingBox from "./../../components/LoadingBox";
import MessageBox from "./../../components/MessageBox";

function AdminSigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const adminSignin = useSelector((state) => state.adminSignin);

  const { adminInfo, loading, error } = adminSignin;
  
  const navigate = useNavigate();
  const location  = useLocation();
  
  const redirect = location.search
    ? location.search.split('=')[1]
    : '';
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminSigninAction(email, password));
  };

  useEffect(() => {
    if (adminInfo) {
      navigate(`/admin/dashboard`);
    }
  }, [navigate, redirect, adminInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In As Admin</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminSigninScreen;
