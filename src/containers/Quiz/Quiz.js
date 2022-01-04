import { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import PropTypes from 'prop-types';
import api from '../../config/api';
import Loader from '../../components/shared/Loader/Loader';

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    isLoading: true,
  };

  retryHandler = () => {
    this.setState({
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      results: {},
    });
  };

  onAnswerClick = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];

      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      this.setState({
        answerState: {
          [answerId]: 'success',
          results,
        },
      });

      const timeout = setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';

      this.setState({
        answerState: {
          [answerId]: 'error',
        },
        results,
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  async componentDidMount() {
    try {
      const response = await api.get(
        `quizes/${this.props.match.params.id}.json`
      );

      const quiz = response.data;

      this.setState({
        quiz,
        isLoading: false,
      });
    } catch (e) {
      this.setState({
        isLoading: false,
      });

      console.log(e);
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Please, answer all questions</h1>
          {this.state.isLoading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClick}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

Quiz.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default Quiz;
