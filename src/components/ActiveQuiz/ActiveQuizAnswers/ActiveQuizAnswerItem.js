import classes from './ActiveQuizAnswerItem.module.scss';
import PropTypes from 'prop-types';

const ActiveQuizAnswerItem = ({ answer, onAnswerClick, state }) => {
  const cls = [classes.AnswerItem];

  if (state) {
    cls.push(classes[state]);
  }

  return (
    <li className={cls.join(' ')} onClick={() => onAnswerClick(answer.id)}>
      {answer.text}
    </li>
  );
};

ActiveQuizAnswerItem.propTypes = {
  answer: PropTypes.object.isRequired,
  onAnswerClick: PropTypes.func,
  state: PropTypes.string,
};

export default ActiveQuizAnswerItem;
