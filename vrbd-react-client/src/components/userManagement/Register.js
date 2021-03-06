import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createNewUser } from "../../actions/SecurityActions";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      name: "",
      surname: "",
      gender: "male",
      role: "guest",
      password: "",
      confirmPassword: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/");
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      name: this.state.name,
      surname: this.state.surname,
      gender: this.state.gender,
      role: this.state.role,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.createNewUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your Account</p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.username,
                      })}
                      placeholder="Email Address (Username)"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.username}{" "}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name,
                      })}
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback"> {errors.name} </div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.surname,
                      })}
                      placeholder="Surname"
                      name="surname"
                      value={this.state.surname}
                      onChange={this.onChange}
                    />
                    {errors.surname && (
                      <div className="invalid-feedback"> {errors.surname} </div>
                    )}
                  </div>
                  <div className="form-group">
                    <p>Gender:</p>
                    <select
                      className="form-control form-control-lg"
                      name="gender"
                      value={this.state.gender}
                      onChange={this.onChange}
                    >
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <p>Role:</p>
                    <select
                      className="form-control form-control-lg"
                      name="role"
                      value={this.state.role}
                      onChange={this.onChange}
                    >
                      <option value={"guest"}>Guest</option>
                      <option value={"host"}>Host</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password,
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.password}{" "}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.confirmPassword,
                      })}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.onChange}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.confirmPassword}{" "}
                      </div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
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
Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  security: state.security,
});

export default connect(mapStateToProps, { createNewUser })(Register);
