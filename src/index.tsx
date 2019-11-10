import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';
import './index.css';

const rootElement = document.getElementById('root');

ReactDOM.render(<Root />, rootElement);
