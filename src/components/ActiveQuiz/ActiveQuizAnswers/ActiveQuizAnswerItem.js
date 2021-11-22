import classes from './ActiveQuizAnswerItem.module.scss';
import PropTypes from 'prop-types';

const ActiveQuizAnswerItem = ({ answer, onAnswerClick }) => {
  return (
    <li className={classes.AnswerItem} onClick={() => onAnswerClick(answer.id)}>
      {answer.text}
    </li>
  );
};

ActiveQuizAnswerItem.propTypes = {
  answer: PropTypes.object.isRequired,
  onAnswerClick: PropTypes.func,
};

export default ActiveQuizAnswerItem;
