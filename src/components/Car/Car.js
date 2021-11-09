import PropTypes from 'prop-types';

const Car = ({ name, year }) => (
  <div>
    <h3>Car name: {name}</h3>
    <p>
      Year: <strong>{year}</strong>
    </p>
  </div>
);

Car.propTypes = {
  name: PropTypes.string,
  year: PropTypes.number,
};

export default Car;
