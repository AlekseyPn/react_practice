import styles from './App.module.scss';
import { Component, createContext } from 'react';
import Car from './components/__practice_ignore__/Car/Car';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/__practice_ignore__/ErrorBoundary/ErrorBoundary';
import Counter from './components/__practice_ignore__/Counter/Counter';

export const ClickedContext = createContext(false);

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
      clicked: false,
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
    const { cars, showCars, pageTitle, clicked } = this.state;

    return (
      <div className={styles.App}>
        <h1>{pageTitle}</h1>
        <ClickedContext.Provider value={clicked}>
          <Counter />
        </ClickedContext.Provider>
        <div style={{ marginBottom: '10px', marginTop: '10px' }}>
          <button onClick={this.toggleCarsHandler}>Toggle cars</button>
          <button onClick={() => this.setState({ clicked: true })}>
            Change Clicked
          </button>
        </div>
        <div className={styles.Cars}>
          {showCars
            ? cars.map((car, index) => (
              <ErrorBoundary key={index}>
                <Car
                  index={index}
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
