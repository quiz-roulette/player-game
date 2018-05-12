import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
var create = document.createElement('link');
create.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
create.rel = "stylesheet";
document.getElementById('root').appendChild(create);
create = document.createElement('link');
create.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css";
create.rel = "stylesheet";
document.getElementById('root').appendChild(create);
registerServiceWorker();
