import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import { Judges } from '../../api/judges.js';
import { createContainer } from 'meteor/react-meteor-data';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';

class JudgeLogin extends React.Component {

    constructor(props) {
        super(props);
        Meteor.subscribe('judges');

        this.styleBtn = { margin: 12, };
    }


    render() {
        return (
            <div>
                <p>Login:</p>
            </div>
        );
    }
}

JudgeLogin.propTypes = {
    judges: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('judges');

    return {
        judges: Judges.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, JudgeLogin);



