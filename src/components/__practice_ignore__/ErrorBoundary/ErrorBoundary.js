import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{ color: 'red' }}>Component has something error</h1>;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  hasError: PropTypes.bool,
  children: PropTypes.element,
};
