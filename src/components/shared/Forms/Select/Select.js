import classes from './Select.module.scss';
import PropTypes from 'prop-types';

const Select = ({ label, value, onChange, options }) => {
  const id = `${label}-${Math.random()}`;
  return (
    <div className={classes.Select}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange}>
        {options.map((option, index) => {
          return (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOf(PropTypes.string, PropTypes.number),
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default Select;
