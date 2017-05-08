import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import Layout from './Layout.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Admin from './admin/Admin.jsx';
import User from './user/User.jsx';

const About = () => <div><h1>About</h1></div>;

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
            open: false
        };
    }

    handleToggle = () => { this.setState({ open: !this.state.open }); }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }


    render() {
        return (
            <Router>
                <div style={{ padding: 0 }}>
                    <Layout></Layout>
                    <Route exact path="/" component={User}></Route>
                    <Route path="/About" component={About}></Route>
                    <Route path="/Admin" component={Admin}></Route>
                </div>
            </Router>
        );
    }
}

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('tasks');

    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, App);