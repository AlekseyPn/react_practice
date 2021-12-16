import { Component, Fragment } from 'react';
import classes from './QuizCreator.module.scss';
import Button from '../../components/shared/Button/Button';
import { createControl, validate, validateForm } from '../../utils/form/form';
import Input from '../../components/shared/Forms/Input/Input';
import Select from '../../components/shared/Forms/Select/Select';
import axios from 'axios';

function createOptionControl(index) {
  return createControl(
    { label: `Option ${index}`, errorMessage: 'Option is required', id: index },
    { required: true }
  );
}

function createControls() {
  return {
    question: createControl(
      {
        label: 'Enter question',
        errorMessage: 'Question is required',
      },
      {
        required: true,
      }
    ),
    options1: createOptionControl(1),
    options2: createOptionControl(2),
    options3: createOptionControl(3),
    options4: createOptionControl(4),
  };
}

class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: createControls(),
    rightAnswerId: 1,
    isFormValid: true,
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  addQuestionHandler = (event) => {
    event.preventDefault();

    const quiz = this.state.quiz.slice(0);
    const index = quiz.length + 1;

    const { question, options1, options2, options3, options4 } =
      this.state.formControls;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answer: [
        {
          text: options1.value,
          id: options1.id,
        },
        {
          text: options2.value,
          id: options2.id,
        },
        {
          text: options3.value,
          id: options3.id,
        },
        {
          text: options4.value,
          id: options4.id,
        },
      ],
    };

    quiz.push(questionItem);

    this.setState({
      quiz,
      formControls: createControls(),
      isFormValid: false,
      rightAnswerId: 1,
    });
  };
  createQuizHandler = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        'https://react-practice-1e444-default-rtdb.europe-west1.firebasedatabase.app/quizes.json',
        this.state.quiz
      );

      this.setState({
        quiz: [],
        formControls: createControls(),
        isFormValid: false,
        rightAnswerId: 1,
      });
    } catch (e) {
      console.log(e);
    }
  };

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;

    control.valid = validate(value, control.validation);

    formControls[controlName] = control;

    const isFormValid = validateForm(formControls);

    this.setState({
      formControls,
      isFormValid,
    });
  };

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    });
  };

  renderControls() {
    return Object.entries(this.state.formControls).map(
      ([controlName, control], index) => {
        return (
          <Fragment key={`${controlName}-${index}`}>
            <Input
              label={control.label}
              valid={control.valid}
              errorMessage={control.errorMessage}
              touched={control.touched}
              shouldValidate={!!control.validation}
              value={control.value}
              onChange={(event) =>
                this.changeHandler(event.target.value, controlName)
              }
            />
            {!index ? <hr /> : null}
          </Fragment>
        );
      }
    );
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Create quiz</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            <Select
              value={this.state.rightAnswerId}
              label="Select right answer"
              options={[
                {
                  text: '1',
                  value: 1,
                },
                {
                  text: '2',
                  value: 2,
                },
                {
                  text: '3',
                  value: 3,
                },
                {
                  text: '4',
                  value: 4,
                },
              ]}
              onChange={this.selectChangeHandler}
            />
            <Button
              type="primary"
              disabled={!this.state.isFormValid}
              onClick={this.addQuestionHandler}
            >
              Add question
            </Button>
            <Button
              type="success"
              disabled={this.state.quiz.length === 0}
              onClick={this.createQuizHandler}
            >
              Create quiz
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
