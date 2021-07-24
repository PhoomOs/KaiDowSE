import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({
  component: Component,
  authenticated,
  activated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          activated ? (
            <Redirect to="/" />
          ) : (
            <Redirect to="/paymentlist" />
          )
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  // activated: state.store.storeDetail.activated,
  // detail : state.store.paymentDetail.account_name
});

// AuthRoute.propTypes = {
//   user: PropTypes.object,
// };

export default connect(mapStateToProps)(AuthRoute);
