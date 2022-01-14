import classes from './Drawer.module.scss';
import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../../shared/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

class Drawer extends Component {
  linkClickHandler = () => {
    this.props.onClose();
  };

  renderLinks(links) {
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

    const links = [
      {
        to: '/',
        label: 'Quiz list',
        exact: true,
      },
    ];

    if (this.props.isAuthenticated) {
      links.push(
        {
          to: '/quiz-creator',
          label: 'Create quiz',
          exact: false,
        },
        {
          to: '/logout',
          label: 'Logout',
          exact: false,
        }
      );
    } else {
      links.push({
        to: '/auth',
        label: 'Login',
        exact: false,
      });
    }

    return (
      <Fragment>
        <nav className={drawerClasses.join(' ')}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </Fragment>
    );
  }
}

Drawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

export default Drawer;
