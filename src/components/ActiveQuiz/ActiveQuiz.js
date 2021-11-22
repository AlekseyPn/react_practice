import classes from './ActiveQuiz.module.scss';
import ActiveQuizAnswers from './ActiveQuizAnswers/ActiveQuizAnswers';
import PropTypes from 'prop-types';

const ActiveQuiz = ({ answers, question, onAnswerClick }) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>2. </strong>
        {question}
      </span>

      <small>4 from 12</small>
    </p>

    <ActiveQuizAnswers answers={answers} onAnswerClick={onAnswerClick} />
  </div>
);

ActiveQuiz.propTypes = {
  answers: PropTypes.array,
  question: PropTypes.string,
  onAnswerClick: PropTypes.func,
};

export default ActiveQuiz;
