import React from 'react';
import { Link } from 'react-router-dom';

import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import JudgesLogin from './JudgesLogin.jsx';
const judegesIcon = <FontIcon className="material-icons">J</FontIcon>;
const formsIcon = <FontIcon className="material-icons">F</FontIcon>;

export default class User extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        name: null,
        id: null,
    };

    setUserId = (id) => this.setState({ id: id });

    renderContext() {
        if (!this.state.id) {
            return (
                <JudgesLogin />
            )
        } else {
            return (
                <h1>Welcome!!</h1>
            )
        }

    }
    render() {

        return (
            <div>
                {this.renderContext()}
            </div>
        )
    }
}