import { Component } from 'react';
import classes from './QuizCreator.module.scss';
import Button from '../../components/shared/Button/Button';
import { createControl } from '../../utils/form/form';
import Input from '../../components/shared/Forms/Input/Input';
import Select from '../../components/shared/Forms/Select/Select';

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
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  addQuestionHandler = () => {};
  createQuizHandler = () => {};

  changeHandler = (event, controlName) => {
    console.log(event, controlName);
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
          <>
            <Input
              key={`${controlName}-${index}`}
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
          </>
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
            <Button type="primary" onClick={this.addQuestionHandler}>
              Add question
            </Button>
            <Button type="success" onClick={this.createQuizHandler}>
              Create quiz
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
