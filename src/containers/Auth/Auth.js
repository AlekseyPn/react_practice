import { Component } from 'react';
import classes from './Auth.module.scss';
import Button from '../../components/shared/Button/Button';
import Input from '../../components/shared/Forms/Input/Input';

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

class Auth extends Component {
  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter a valid email address',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter a valid password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = () => {};
  registerHandler = () => {};
  submitHandler = (event) => {
    event.preventDefault();
  };

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validate(control.validation, control.value);
    formControls[controlName] = control;

    this.setState({
      formControls,
    });
  };

  validate = (validation, value) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = !!value.trim() && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  renderInputs() {
    return Object.entries(this.state.formControls).map(
      ([key, control], index) => {
        return (
          <Input
            key={index + key}
            value={control.value}
            type={control.type}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={(event) => {
              this.onChangeHandler(event, key);
            }}
          />
        );
      }
    );
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Login</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <Button type="success" onClick={this.loginHandler}>
              Login
            </Button>
            <Button type="primary" onClick={this.registerHandler}>
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
