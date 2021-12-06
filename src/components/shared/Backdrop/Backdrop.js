import classes from './Backdrop.module.scss';
import PropTypes from 'prop-types';

const Backdrop = ({ onClick }) => (
  <div className={classes.Backdrop} onClick={onClick}></div>
);

Backdrop.propTypes = {
  onClick: PropTypes.func,
};

export default Backdrop;
