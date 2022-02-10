import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { managerSigninAction } from "./../../redux/actions/managerActions";
import LoadingBox from "./../../components/LoadingBox";
import MessageBox from "./../../components/MessageBox";

function ManagerSigninScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const managerSignin = useSelector((state) => state.managerSignin);
  
  const { managerInfo, loading, error } = managerSignin;
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(managerSigninAction(email, password));
    navigate('/manager/dashboard');
  };

  useEffect(() => {
    if (managerInfo) {
      navigate(`/manager/dashboard`);
    }
  }, [navigate,managerInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In Manager</h1>
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

export default ManagerSigninScreen;
