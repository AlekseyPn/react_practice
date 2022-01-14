import { Component } from 'react';
import Layout from './components/hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logout from './containers/Logout/Logout';
import { autoLogin } from './store/actions/auth';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  autoLogin: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
