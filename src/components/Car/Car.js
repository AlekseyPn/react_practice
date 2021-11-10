import PropTypes from 'prop-types';
import Radium from 'radium';
import './Car.scss';

const Car = ({ name, year, onChangeName, onDelete, src }) => {
  const inputClasses = ['input'];

  if (name) {
    inputClasses.push('green');
  } else {
    inputClasses.push('red');
  }

  if (name.length > 4) {
    inputClasses.push('bold');
  }

  const style = {
    border: '1px solid #ccc',
    boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.14)',
    ':hover': {
      border: '1px solid #aaa',
      boxShadow: '0 4px 15px 0 rgba(0, 0, 0, 0.25)',
      cursor: 'pointer',
    },
  };

  return (
    <div className="Car" style={style}>
      <img
        src={src}
        alt={name}
        style={{ marginBottom: '10px' }}
        width="320"
        height="240"
      />
      <h3>Car name: {name}</h3>
      <p>
        Year: <strong>{year}</strong>
      </p>
      <input
        type="text"
        onChange={onChangeName}
        value={name}
        className={inputClasses.join(' ')}
      />
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

Car.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  year: PropTypes.number,
  onChangeName: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Radium(Car);
