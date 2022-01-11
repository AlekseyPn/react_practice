import { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import PropTypes from 'prop-types';
import Loader from '../../components/shared/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById } from '../../store/actions/quiz';

class Quiz extends Component {
  retryHandler = () => {
    this.setState({
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      results: {},
    });
  };

  onAnswerClick = (answerId) => {
    if (this.props.answerState) {
      const key = Object.keys(this.props.answerState)[0];

      if (this.props.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.props.quiz[this.props.activeQuestion];
    const results = this.props.results;

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
            activeQuestion: this.props.activeQuestion + 1,
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
    return this.props.activeQuestion + 1 === this.props.quiz.length;
  }

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Please, answer all questions</h1>
          {this.props.isLoading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.onAnswerClick}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              state={this.props.answerState}
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

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    isLoading: state.quiz.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (quizId) => dispatch(fetchQuizById(quizId)),
  };
}

Quiz.propTypes = {
  results: PropTypes.object,
  isFinished: PropTypes.bool,
  activeQuestion: PropTypes.number,
  answerState: PropTypes.object,
  quiz: PropTypes.object,
  isLoading: PropTypes.bool,
  fetchQuizById: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
