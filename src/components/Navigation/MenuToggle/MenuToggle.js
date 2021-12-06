import classes from './MenuToggle.module.scss';
import PropTypes from 'prop-types';

const MenuToggle = ({ onToggle, isOpen }) => {
  const btnClasses = [classes.MenuToggle, 'fa'];

  if (isOpen) {
    btnClasses.push('fa-times', classes.open);
  } else {
    btnClasses.push('fa-bars');
  }

  return <i className={btnClasses.join(' ')} onClick={onToggle}></i>;
};

MenuToggle.propTypes = {
  onToggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default MenuToggle;
