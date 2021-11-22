import { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        id: 1,
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
      {
        id: 2,
        question: 'In what year was St. Petersburg founded?',
        rightAnswerId: 3,
        answers: [
          {
            id: 1,
            text: '1700',
          },
          {
            id: 2,
            text: '1705',
          },
          {
            id: 3,
            text: '1703',
          },
          {
            id: 4,
            text: '1803',
          },
        ],
      },
    ],
  };

  onAnswerClick = (answerId) => {
    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: {
          [answerId]: 'success',
        },
      });

      const timeout = setTimeout(() => {
        if (this.isQuizFinished()) {
          console.log('Finished');
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        clearTimeout(timeout);
      }, 1000);
    } else {
      this.setState({
        answerState: {
          [answerId]: 'error',
        },
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Please, answer all questions</h1>
          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClick}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
