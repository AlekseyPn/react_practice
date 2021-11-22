import { Component } from 'react';
import Layout from './components/hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <Quiz />
      </Layout>
    );
  }
}

export default App;
