import classes from './ActiveQuiz.module.scss';
import ActiveQuizAnswers from './ActiveQuizAnswers/ActiveQuizAnswers';
import PropTypes from 'prop-types';

const ActiveQuiz = ({
  answers,
  question,
  onAnswerClick,
  quizLength,
  answerNumber,
  state,
}) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{answerNumber}. </strong>
        {question}
      </span>

      <small>
        {answerNumber} of {quizLength}
      </small>
    </p>

    <ActiveQuizAnswers
      answers={answers}
      onAnswerClick={onAnswerClick}
      state={state}
    />
  </div>
);

ActiveQuiz.propTypes = {
  answers: PropTypes.array,
  question: PropTypes.string,
  onAnswerClick: PropTypes.func,
  quizLength: PropTypes.number,
  answerNumber: PropTypes.number,
  state: PropTypes.object,
};

export default ActiveQuiz;
