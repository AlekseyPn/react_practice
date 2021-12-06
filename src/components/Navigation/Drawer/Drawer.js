import classes from './Drawer.module.scss';
import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../../shared/Backdrop/Backdrop';

const links = [1, 2, 3];

class Drawer extends Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a>Link {link}</a>
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
