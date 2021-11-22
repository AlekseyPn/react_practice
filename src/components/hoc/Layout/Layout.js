import { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Layout.module.scss';

class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <main className={classes.LayoutMain}>{this.props.children}</main>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
