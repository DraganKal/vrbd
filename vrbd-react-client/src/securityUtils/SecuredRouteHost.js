import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SecuredRouteHost = ({
  component: Component,
  security,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={(props) =>
      security.validToken === true && security.user.role === "HOST" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/home" />
      )
    }
  />
);

SecuredRouteHost.propTypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps)(SecuredRouteHost);
