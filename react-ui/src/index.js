import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'services/config/Routes';
// styles
import 'normalize.css';
import 'components/styles/styles.less';

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
