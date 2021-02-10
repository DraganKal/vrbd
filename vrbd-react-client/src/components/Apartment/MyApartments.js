import React, { Component } from "react";
import CreateApartmentButton from "./CreateApartmentButton";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getApartmentsByHost } from "./../../actions/apartmentActions";
import ApartmentItem from "./ApartmentItem";

class MyApartments extends Component {
  componentDidMount() {
    this.props.getApartmentsByHost();
  }

  render() {
    const { apartments } = this.props.apartment;
    return (
      <div className="myApartments">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Apartments</h1>
              <br />
              <CreateApartmentButton />
              <br />
              <hr />
              {apartments.map((apartment) => (
                <ApartmentItem key={apartment.id} apartment={apartment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyApartments.propTypes = {
  apartment: PropTypes.object.isRequired,
  getApartmentsByHost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  apartment: state.apartment,
});

export default connect(mapStateToProps, { getApartmentsByHost })(MyApartments);
