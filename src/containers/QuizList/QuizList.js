import { Component } from 'react';
import classes from './QuizList.module.scss';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/shared/Loader/Loader';
import api from '../../config/api';

class QuizList extends Component {
  state = {
    quizzes: [],
    isLoading: true,
  };

  renderQuizzes() {
    return this.state.quizzes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    try {
      const response = await api.get('quizes.json');

      const quizzes = [];
      Object.keys(response.data || {}).forEach((key, index) => {
        quizzes.push({ id: key, name: `Тест №${index + 1}` });
      });

      this.setState({
        quizzes,
        isLoading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz list</h1>

          {this.state.isLoading ? <Loader /> : <ul>{this.renderQuizzes()}</ul>}
        </div>
      </div>
    );
  }
}

export default QuizList;
