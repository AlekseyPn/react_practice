import classes from './FinishedQuiz.module.scss';
import PropTypes from 'prop-types';
import Button from '../shared/Button/Button';
import { Link } from 'react-router-dom';

const FinishedQuiz = ({ quiz, results, onRetry }) => {
  const successCount = Object.values(results).reduce((total, state) => {
    if (state === 'success') {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {quiz.map((item, index) => {
          const iconClasses = [
            'fa',
            results[item.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[results[item.id]],
          ].join(' ');

          return (
            <li key={index}>
              <strong>{index + 1}. </strong>
              {item.question}
              <i className={iconClasses} />
            </li>
          );
        })}
      </ul>

      <p>
        Right {successCount} of {quiz.length}
      </p>
      <div>
        <Button onClick={onRetry} type="primary">
          Repeat
        </Button>
        <Link to="/">
          <Button onClick={onRetry} type="success">
            Go to test list
          </Button>
        </Link>
      </div>
    </div>
  );
};

FinishedQuiz.propTypes = {
  quiz: PropTypes.array,
  results: PropTypes.object,
  onRetry: PropTypes.func,
};

export default FinishedQuiz;
