import { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state = {
    quiz: [
      {
        question: 'What color is the sky?',
        rightAnswerId: 2,
        answers: [
          {
            id: 1,
            text: 'Black',
          },
          {
            id: 2,
            text: 'Blue',
          },
          {
            id: 3,
            text: 'Red',
          },
          {
            id: 4,
            text: 'Green',
          },
        ],
      },
    ],
  };

  onAnswerClick = (answerId) => {
    console.log('id', answerId);
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Please, answer all questions</h1>
          <ActiveQuiz
            answers={this.state.quiz[0].answers}
            question={this.state.quiz[0].question}
            onAnswerClick={this.onAnswerClick}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
