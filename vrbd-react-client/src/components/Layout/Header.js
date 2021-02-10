import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/SecurityActions";
import logo from "./../../images/logo.png";

class Header extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }
  render() {
    const { validToken, user } = this.props.security;

    const userIsHost = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto topnav">
          <li className="nav-item active">
            <Link className="nav-link" to="/home">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/myApartments">
              My Apartments
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              Reservations
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              My Guests
            </Link>
          </li>

          <li className="nav-item active">
            <Link className="nav-link " to={`/profile/${user.id}`}>
              <i className="fas fa-user-circle mr-1">{user.name}</i>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link btn btn-danger text-white"
              type="button"
              to="/logout"
              data-toggle="modal"
              data-target="#myModal"
              onClick={this.logout.bind(this)}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsGuest = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto topnav">
          <li className="nav-item active">
            <Link className="nav-link" to="/home">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              All Apartments
            </Link>
          </li>

          <li className="nav-item active">
            <Link className="nav-link " to={`/profile/${user.id}`}>
              <i className="fas fa-user-circle mr-1">{user.name}</i>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link btn btn-danger text-white"
              type="button"
              to="/logout"
              data-toggle="modal"
              data-target="#myModal"
              onClick={this.logout.bind(this)}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsNotAuthenticated = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto topnav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link btn btn-primary text-white"
              type="button"
              to="/login"
              data-toggle="modal"
              data-target="#myModal"
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link btn btn-danger text-white"
              type="button"
              to="/register"
              data-toggle="modal"
              data-target="#myModal"
            >
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    );

    let headerLinks;

    if (validToken && user && user.role === "HOST") {
      headerLinks = userIsHost;
    } else if (validToken && user && user.role === "GUEST") {
      headerLinks = userIsGuest;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <Link className="navbar-brand" to="/">
          <img src={logo} height="50px" width="50px" alt="VRBD" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {headerLinks}
      </nav>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);
