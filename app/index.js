import React from "react";
import ReactDOM from 'react-dom';
import BabelPolyfill from 'babel-polyfill';

import './index.css';
import App from './components/App';

ReactDOM.render(<App/>, document.getElementById('app'));