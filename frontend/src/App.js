import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Staff from "./pages/Staff";
import Profile from "./pages/Profile";
import EachDoctor from "./pages/EachDoctor";
import Appointment from "./components/Appointment";
import EditProfilePatient from "./components/EditProfilePatient";
import EditProfileDoctor from "./components/EditProfileDoctor";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import userActions from "./redux/actions/userActions";
import patientActions from "./redux/actions/patientActions";
import Login from "./components/Login";
import Information from "./components/Information";
import io from "socket.io-client";

const App = (props) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.logWithLs(localStorage.getItem("token"));
    }
  }, []);
  useEffect(() => {
    setSocket(io("http://localhost:4000/"));
  }, []);
  props.getSocket(socket);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        {!props.valid && <Route path="/signup" component={SignUp} />}
        <Route exact path="/staff" component={Staff} />
        <Route path="/staff/:id" component={EachDoctor} />
        <Route path="/information" component={Information} />
        <Route path="/appointment" component={Appointment} />
        {props.valid && props.user.userExist.doc && (
          <Route exact path="/doc/profile" component={EditProfileDoctor} />
        )}
        {props.valid && <Route exact path="/profile" component={Profile} />}
        {props.valid && !props.user.userExist.doc && (
          <Route exact path="/patient/profile" component={EditProfilePatient} />
        )}
        {!props.valid && <Route path="/login" component={Login} />}
        <Redirect to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    valid: state.users.token,
    user: state.users.dataUser,
  };
};

const mapDispatchToProps = {
  logWithLs: userActions.logUserWithLs,
  getSocket: patientActions.getSocket,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
