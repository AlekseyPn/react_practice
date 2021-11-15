import styles from './App.module.scss';
import { Component } from 'react';
import Car from './components/Car/Car';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Counter from './components/Counter/Counter';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cars: [
        {
          name: 'Ford',
          year: 2016,
          src: 'https://loremflickr.com/320/240/ford',
        },
        {
          name: 'Mazda',
          year: 2020,
          src: 'https://loremflickr.com/320/240/mazda',
        },
      ],
      pageTitle: props.title,
      showCars: false,
    };
  }

  changeNameHandler = (name, index) => {
    const car = this.state.cars[index];
    const cars = [...this.state.cars];

    cars.splice(index, 1, { ...car, name });

    this.setState({
      cars,
    });
  };

  toggleCarsHandler = () => {
    this.setState({
      showCars: !this.state.showCars,
    });
  };

  deleteHandler = (index) => {
    const cars = [...this.state.cars];

    cars.splice(index, 1);

    this.setState({
      cars,
    });
  };

  render() {
    const { cars, showCars, pageTitle } = this.state;

    return (
      <div className={styles.App}>
        <h1>{pageTitle}</h1>
        <Counter />
        <div style={{ marginBottom: '10px', marginTop: '10px' }}>
          <button onClick={this.toggleCarsHandler}>Toggle cars</button>
        </div>
        <div className={styles.Cars}>
          {showCars
            ? cars.map((car, index) => (
                <ErrorBoundary key={index}>
                  <Car
                    name={car.name}
                    year={car.year}
                    src={car.src}
                    onChangeName={(event) =>
                      this.changeNameHandler(event.target.value, index)
                    }
                    onDelete={this.deleteHandler.bind(this, index)}
                  />
                </ErrorBoundary>
              ))
            : 'Click for show cars ⬆️'}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string,
};

export default App;
