import classes from './ActiveQuizAnswers.module.scss';
import ActiveQuizAnswerItem from './ActiveQuizAnswerItem';
import PropTypes from 'prop-types';

const ActiveQuizAnswers = ({ answers, onAnswerClick }) => (
  <ul className={classes.Answers}>
    {answers.map((answer) => {
      return (
        <ActiveQuizAnswerItem
          key={answer.id}
          answer={answer}
          onAnswerClick={onAnswerClick}
        />
      );
    })}
  </ul>
);

ActiveQuizAnswers.propTypes = {
  answers: PropTypes.array,
  onAnswerClick: PropTypes.func,
};

export default ActiveQuizAnswers;
