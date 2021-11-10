import styles from './App.module.scss';
import { Component } from 'react';
import Car from './components/Car/Car';

class App extends Component {
  state = {
    cars: [
      { name: 'Ford', year: 2016, src: 'https://loremflickr.com/320/240/car' },
      { name: 'Mazda', year: 2020, src: 'https://loremflickr.com/320/240/car' },
    ],
    pageTitle: 'React components',
    showCars: false,
  };

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
    const { cars, pageTitle, showCars } = this.state;

    return (
      <div className={styles.App}>
        <h1>{pageTitle}</h1>

        <div style={{ marginBottom: '10px' }}>
          <button onClick={this.toggleCarsHandler}>Toggle cars</button>
        </div>
        <div className={styles.Cars}>
          {showCars
            ? cars.map((car, index) => (
                <Car
                  name={car.name}
                  year={car.year}
                  src={car.src}
                  key={index}
                  onChangeName={(event) =>
                    this.changeNameHandler(event.target.value, index)
                  }
                  onDelete={this.deleteHandler.bind(this, index)}
                />
              ))
            : 'Click for show cars ⬆️'}
        </div>
      </div>
    );
  }
}

export default App;
