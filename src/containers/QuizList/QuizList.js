import { Component } from 'react';
import classes from './QuizList.module.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class QuizList extends Component {
  renderQuizzes() {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={`/quiz/${quiz}`}>Test {quiz}</NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    axios
      .get(
        'https://react-practice-1e444-default-rtdb.europe-west1.firebasedatabase.app/quizes.json'
      )
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz list</h1>

          <ul>{this.renderQuizzes()}</ul>
        </div>
      </div>
    );
  }
}

export default QuizList;
