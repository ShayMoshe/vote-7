import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import Judeges from './Judges.jsx';
import Forms from './Forms.jsx';
import { Meteor } from 'meteor/meteor';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import AccountsUIWrapper from './../AccountsUIWrapper.jsx';
import { Users } from '../../api/users.js';

const judegesIcon = <FontIcon className="material-icons">J</FontIcon>;
const formsIcon = <FontIcon className="material-icons">F</FontIcon>;

class Admin extends React.Component {

    constructor(props) {
        super(props);
        Meteor.subscribe('userList');

    }

    state = {
        selectedIndex: 1,
    };

    select = (index) => this.setState({ selectedIndex: index });

    renderContext() {
        
        if (this.state.selectedIndex === 0) {
            return (
                <Judeges />
            )
        } else {
            return (
                <Forms />
            )
        }

    }
    render() {
        return (
            <div>
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="Judges"
                            icon={judegesIcon}
                            onTouchTap={() => this.select(0)}
                        />
                        <BottomNavigationItem
                            label="Forms"
                            icon={formsIcon}
                            onTouchTap={() => this.select(1)}
                        />
                    </BottomNavigation>
                </Paper>
                <AccountsUIWrapper />

                {this.renderContext()}
            </div>
        )

    }
}

Admin.propTypes = {
    users: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('userList');
    return {
        
    };
}, Admin);
