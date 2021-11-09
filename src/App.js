import './App.css';
import { Component } from 'react';
import Car from './components/Car/Car';

class App extends Component {
  render() {
    const divStyle = {
      textAlign: 'center',
    };

    return (
      <div className="App" style={divStyle}>
        <h1>Hello World!!!</h1>
        <Car name={'Ford'} year={2020} />
        <Car name={'Mazda'} year={2018} />
      </div>
    );
  }
}

export default App;
