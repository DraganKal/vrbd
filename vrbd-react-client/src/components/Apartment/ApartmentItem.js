import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ApartmentItem extends Component {
  render() {
    const { apartment } = this.props;
    return (
      <div className="container">
        <div className="card">
          <h5 className="card-header">{apartment.type}</h5>
          <div className="card-body">
            <h5 className="card-title">{apartment.type}</h5>
            <p className="card-text">
              Number of rooms: {apartment.numberOfRooms}
              <br />
              Number of guests: {apartment.numberOfGuests}
              <br />
              Price per night: {apartment.pricePerNight}
            </p>
            <Link to="/" className="btn btn-primary">
              Go somewhere
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ApartmentItem;
