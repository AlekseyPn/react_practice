import classes from './ActiveQuizAnswers.module.scss';
import ActiveQuizAnswerItem from './ActiveQuizAnswerItem';
import PropTypes from 'prop-types';

const ActiveQuizAnswers = ({ answers, onAnswerClick, state }) => (
  <ul className={classes.Answers}>
    {answers.map((answer) => {
      return (
        <ActiveQuizAnswerItem
          key={answer.id}
          answer={answer}
          onAnswerClick={onAnswerClick}
          state={state ? state[answer.id] : null}
        />
      );
    })}
  </ul>
);

ActiveQuizAnswers.propTypes = {
  answers: PropTypes.array,
  onAnswerClick: PropTypes.func,
  state: PropTypes.object,
};

export default ActiveQuizAnswers;
