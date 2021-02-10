import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Layout/Header";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/SetJWTToken";
import Landing from "./components/Layout/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/userManagement/Register";
import Login from "./components/userManagement/Login";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/SecurityActions";
import Footer from "./components/Layout/Footer";
import SecureRoute from "./securityUtils/SecureRoute";
import UserProfile from "./components/userManagement/UserProfile";
import MyApartments from "./components/Apartment/MyApartments";

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });
  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              //Public ROutes
            }
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              //Private Routes
            }
            <Switch>
              <SecureRoute exact path="/profile/:id" component={UserProfile} />
              <SecureRoute
                exact
                path="/myApartments"
                component={MyApartments}
              />
            </Switch>
          </div>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
