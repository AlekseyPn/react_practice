import { Component } from 'react';
import classes from './Auth.module.scss';
import Button from '../../components/shared/Button/Button';
import Input from '../../components/shared/Forms/Input/Input';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../store/actions/auth';

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

class Auth extends Component {
  state = {
    isFormValid: false,
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

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };
  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
  };
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

    const isFormValid = Object.values(formControls).every(
      (control) => control.valid
    );

    this.setState({
      formControls,
      isFormValid,
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

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Login
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) =>
      dispatch(auth(email, password, isLogin)),
  };
}

Auth.propTypes = {
  auth: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Auth);
