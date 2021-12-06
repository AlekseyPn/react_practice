import classes from './Button.module.scss';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, disabled, type }) => {
  const btnClasses = [classes.Button, classes[type]].join(' ');

  return (
    <button className={btnClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
