import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, Link, hasHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import '../imports/startup/accounts-config';
import App from '../imports/ui/App';


Meteor.startup(() => {
  const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#00abe6'
    },
});
  render(<MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>,
    document.getElementById('render-target'));
});