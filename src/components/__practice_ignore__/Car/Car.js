import PropTypes from 'prop-types';
import classes from './Car.module.scss';
import { Component, createRef } from 'react';
import withClass from '../hoc/withClass';

class Car extends Component {
  constructor(props) {
    super(props);

    this.inputRef = createRef();
  }

  componentDidMount() {
    if (this.props.index === 0) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const { name, src, year, onChangeName, onDelete } = this.props;

    const inputClasses = [classes.input];

    if (name) {
      inputClasses.push(classes.green);
    } else {
      inputClasses.push(classes.red);
    }

    if (name.length > 4) {
      inputClasses.push(classes.bold);
    }

    return (
      <>
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
          ref={this.inputRef}
          type="text"
          onChange={onChangeName}
          value={name}
          className={inputClasses.join(' ')}
        />
        <button onClick={onDelete}>Delete</button>
      </>
    );
  }
}

Car.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  year: PropTypes.number,
  onChangeName: PropTypes.func,
  onDelete: PropTypes.func,
  index: PropTypes.number,
};

export default withClass(Car, classes.Car);
