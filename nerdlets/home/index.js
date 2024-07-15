import React from 'react';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

import App from './Components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeNerdlet = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>

  );
};

export default HomeNerdlet;

