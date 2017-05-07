import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, Link, hasHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../imports/startup/accounts-config';
import App from '../imports/ui/App';

Meteor.startup(() => {
  render(<MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
    document.getElementById('render-target'));
});