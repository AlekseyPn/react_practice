import { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

Logout.propTypes = {
  logout: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}
export default connect(null, mapDispatchToProps)(Logout);
