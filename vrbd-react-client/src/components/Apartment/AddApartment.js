import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { addApartment } from "../../actions/apartmentActions";

class AddApartment extends Component {
  constructor() {
    super();

    this.state = {
      type: "",
      numberOfRooms: "",
      numberOfGuests: "",
      pricePerNight: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newApartment = {
      type: this.state.type,
      numberOfRooms: this.state.numberOfRooms,
      numberOfGuests: this.state.numberOfGuests,
      pricePerNight: this.state.pricePerNight,
    };

    this.props.addApartment(newApartment, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Add new Apartment</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <p>Type:</p>
                    <select
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.type,
                      })}
                      name="type"
                      value={this.state.type}
                      onChange={this.onChange}
                    >
                      <option value="" selected disabled hidden>
                        Choose here
                      </option>
                      <option value={"Apartment"}>Apartment</option>
                      <option value={"Room"}>Room</option>
                    </select>
                    {errors.type && (
                      <div className="invalid-feedback">{errors.type}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.numberOfRooms,
                      })}
                      placeholder="Number of Rooms"
                      name="numberOfRooms"
                      value={this.state.numberOfRooms}
                      onChange={this.onChange}
                    />
                    {errors.numberOfRooms && (
                      <div className="invalid-feedback">
                        {errors.numberOfRooms}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.numberOfGuests,
                      })}
                      placeholder="Number of Guests"
                      name="numberOfGuests"
                      value={this.state.numberOfGuests}
                      onChange={this.onChange}
                    ></textarea>
                    {errors.numberOfGuests && (
                      <div className="invalid-feedback">
                        {errors.numberOfGuests}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.pricePerNight,
                      })}
                      placeholder="Price Pre Night"
                      name="pricePerNight"
                      value={this.state.pricePerNight}
                      onChange={this.onChange}
                    ></textarea>
                    {errors.pricePerNight && (
                      <div className="invalid-feedback">
                        {errors.pricePerNight}
                      </div>
                    )}
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddApartment.propTypes = {
  addApartment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addApartment })(AddApartment);
