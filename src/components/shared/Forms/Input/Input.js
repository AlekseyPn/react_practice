import classes from './Input.module.scss';
import PropTypes from 'prop-types';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = ({
  type,
  label,
  value,
  onChange,
  errorMessage,
  valid,
  shouldValidate,
  touched,
}) => {
  const inputType = type || 'text';

  const inputClasses = [classes.Input];

  const inputId = `${inputType}-${Math.random()}`;

  if (isInvalid({ valid, touched, shouldValidate })) {
    inputClasses.push(classes.invalid);
  }

  return (
    <div className={inputClasses.join(' ')}>
      <label htmlFor={inputId}>{label}</label>
      <input type={inputType} id={inputId} value={value} onChange={onChange} />
      {isInvalid({ valid, touched, shouldValidate }) ? (
        <span>{errorMessage || 'Enter valid value'}</span>
      ) : null}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  errorMessage: PropTypes.string,
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  shouldValidate: PropTypes.bool,
};

export default Input;
