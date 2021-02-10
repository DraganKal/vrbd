import React, { Component } from "react";
import { getUser, updateUser } from "../../actions/SecurityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      username: "",
      name: "",
      surname: "",
      gender: "male",
      role: "guest",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const { id, username, name, surname, gender, role } = nextProps.user;

    this.setState({
      id,
      username,
      name,
      surname,
      gender,
      role,
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getUser(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateUser = {
      id: this.state.id,
      username: this.state.username,
      name: this.state.name,
      surname: this.state.surname,
      gender: this.state.gender,
      role: this.state.role,
    };

    this.props.updateUser(this.state.id, updateUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Profile</h1>
                <p className="lead text-center">Update your Account</p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    Username (Email):
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
                    Name:
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
                    Surname:
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
                      disabled
                    >
                      <option value={"HOST"}>Host</option>
                      <option value={"GUEST"}>Guest</option>
                    </select>
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

UserProfile.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  errors: state.errors,
});

export default connect(mapStateToProps, { getUser, updateUser })(UserProfile);
