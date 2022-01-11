import { Component } from 'react';
import classes from './QuizList.module.scss';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/shared/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizzes } from '../../store/actions/quiz';
import PropTypes from 'prop-types';

class QuizList extends Component {
  renderQuizzes() {
    return this.props.quizzes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    this.props.fetchQuizzes();
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz list</h1>

          {this.props.isLoading && !this.props.quizzes.length ? (
            <Loader />
          ) : (
            <ul>{this.renderQuizzes()}</ul>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizzes: state.quiz.quizzes,
    isLoading: state.quiz.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizzes: () => dispatch(fetchQuizzes()),
  };
}

QuizList.propTypes = {
  isLoading: PropTypes.bool,
  quizzes: PropTypes.array,
  fetchQuizzes: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
