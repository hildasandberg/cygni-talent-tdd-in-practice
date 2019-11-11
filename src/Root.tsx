import React, { Component, StrictMode } from 'react';
import App from './App';
import FlickServiceImpl from './api/FlickrServiceImpl';
import { FlickrServiceProvider } from './api/FlickrServiceContext';

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
    const flickrService = new FlickServiceImpl(
      process.env.REACT_APP_FLICKR_API_KEY,
    );

    return (
      <StrictMode>
        <FlickrServiceProvider flickrService={flickrService}>
          <App />
        </FlickrServiceProvider>
      </StrictMode>
    );
  }
}
