import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { Judges } from '../../api/judges.js';
import { createContainer } from 'meteor/react-meteor-data';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const style = {
    height: 240,
    width: 320,
    marginTop: 30,
    marginLeft: '50%',
    textAlign: 'center',
    display: 'inline-block',
    position: 'relative',
    right: 150
};

const styleBtn = {
    margin: 12,
};

class JudgeLogin extends React.Component {

    constructor(props) {
        super(props);
        Meteor.subscribe('judges');

        this.styleBtn = { margin: 12, };

    }

    state = {
        errorTextField: ''
    };

    judgeLogin() {
        const id = this.refs.idInputJudge.input.value.trim();
        this.setState({ errorTextField: '' });
        let judgeInfo = Judges.findOne({ judgeId: id });
        if (judgeInfo) {
            console.log(judgeInfo);
        } else {
            console.warn('login failed!');
            this.setState({ errorTextField: 'login failed' });
        }
    }

    renderLogin() {
        return (
            <div>
                <h2 style={{ color: '#00abe6', marginTop: 25 }}>Login</h2>
                <TextField
                    floatingLabelText="ID"
                    ref="idInputJudge"
                    errorText={this.state.errorTextField}
                />
                <RaisedButton label="Enter" primary={true}
                    style={styleBtn}
                    onClick={this.judgeLogin.bind(this)} />
            </div>
        )
    }

    render() {
        return (
            <Paper style={style} zDepth={3} children={this.renderLogin()} />
        );
    }
}

JudgeLogin.propTypes = {
    //judges: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('judges');

    return {
        //judges: Judges.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, JudgeLogin);



