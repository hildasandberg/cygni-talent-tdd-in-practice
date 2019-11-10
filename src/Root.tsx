import React, { Component, StrictMode } from 'react';
import App from './App';

export default class Root extends Component {
  componentDidMount() {
    if (module.hot !== undefined) {
      module.hot.accept('./App', () => {
        this.forceUpdate();
      });
    }
  }

  componentWillUnmount() {
    if (module.hot !== undefined) {
      module.hot.decline('./App');
    }
  }

  render() {
    return (
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}
