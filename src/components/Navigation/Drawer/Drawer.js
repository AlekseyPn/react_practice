import classes from './Drawer.module.scss';
import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../../shared/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

const links = [
  {
    to: '/',
    label: 'Quiz list',
    exact: true,
  },
  {
    to: '/auth',
    label: 'Login',
    exact: false,
  },
  {
    to: '/quiz-creator',
    label: 'Create quiz',
    exact: false,
  },
];

class Drawer extends Component {
  linkClickHandler = () => {
    this.props.onClose();
  };

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.linkClickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const drawerClasses = [classes.Drawer];

    if (!this.props.isOpen) {
      drawerClasses.push(classes.close);
    }

    return (
      <Fragment>
        <nav className={drawerClasses.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </Fragment>
    );
  }
}

Drawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Drawer;
