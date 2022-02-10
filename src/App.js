import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { managerSignoutAction } from "./redux/actions/managerActions";
import { adminSignoutAction } from "./redux/actions/adminActions";
import ManagerSigninScreen from "./screens/manager/ManagerSigninScreen";
import AdminSigninScreen from "./screens/admin/AdminSigninScreen";
import ManagerDashboardScreen from "./screens/manager/ManagerDashboardScreen";
import AdminDashboardScreen from "./screens/admin/AdminDashboardScreen";
import WelcomScreen from "./screens/WelcomScreen";
import ManagerRoutes from "./components/ManagerRoutes";
import AdminRoutes from "./components/AdminRoutes";

function App() {
  const managerSignin = useSelector((state) => state.managerSignin);
  const adminSignin = useSelector((state) => state.adminSignin);
  const managerInfo = managerSignin ? managerSignin.managerInfo : null;
  const adminInfo = adminSignin ? adminSignin.adminInfo : null;
  console.log(adminInfo);
  const dispatch = useDispatch();

  const managerSignoutHandler = (e) => {
    e.preventDefault();
    dispatch(managerSignoutAction());
  };

  const adminSignoutHandler = (e) => {
    e.preventDefault();
    dispatch(adminSignoutAction());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Events Platform
            </Link>

            {!(managerInfo || adminInfo) ? (
              <>
                <Link to="/admin/signin">Sign In as admin</Link>
                <Link to="/manager/signin">Sign In as manager</Link>
              </>
            ) : null}

            {managerInfo && (
              <>
                <Link to="/manager/dashboard">Dashboard</Link>
                <Link to="#manager">
                  welcome {managerInfo.manager?.name}{" "}
                  <i className="fa fa-caret-down"></i>
                </Link>
                
                  <Link to="#signout" onClick={managerSignoutHandler}>
                    Sign Out
                  </Link>
                
              </>
            )}

            {adminInfo && (
              <>
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="#admin">
                  welcome {adminInfo.admin?.name}{" "}
                  <i className="fa fa-caret-down"></i>
                </Link>
               
                  <Link to="#signout" onClick={adminSignoutHandler}>
                    Sign Out
                  </Link>
                

              </>
            )}
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" exact element={<WelcomScreen />} exact></Route>

            <Route
              exact
              path="/manager/signin"
              element={<ManagerSigninScreen />}
            ></Route>

            <Route
              exact
              path="/admin/signin"
              element={<AdminSigninScreen />}
            ></Route>

            <Route element={<AdminRoutes />}>
              <Route
                exact
                path="/admin/dashboard"
                element={<AdminDashboardScreen />}
              />
            </Route>

            <Route element={<ManagerRoutes />}>
              <Route
                exact
                path="/manager/dashboard"
                element={<ManagerDashboardScreen />}
              />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
