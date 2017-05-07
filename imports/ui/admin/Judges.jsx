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
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

class JudgesManager extends React.Component {

    constructor(props) {
        super(props);
        Meteor.subscribe('judges');

        this.styleBtn = { margin: 12, };
    }

    deleteJudge() {
        Meteor.call('judges.remove', this._id);
    }

    addJudge(event) {
        const name = this.refs.nameInput.input.value.trim();
        const id = this.refs.idInput.input.value.trim();

        let judgeObj = {
            judgeName: name,
            judgeId: id
        };
        Meteor.call('judges.insert', judgeObj);

        // Clear form
        this.refs.nameInput.input.value = '';
        this.refs.idInput.input.value = '';
    }

    handleChangeName = (event) => {
        Meteor.call('judges.setName', event.target.name, event.target.value);
    };

    handleChangeId = (event) => {
        Meteor.call('judges.setId', event.target.name, event.target.value);
    };

    renderListItem(judge) {
        return (
            <div>
                <TextField
                    id={"name" + judge._id}
                    name={judge._id}
                    value={judge.judgeName}
                    onChange={this.handleChangeName}
                    style={{ marginRight: 20 }}
                />

                <TextField
                    id={"id" + judge._id}
                    name={judge._id}
                    value={judge.judgeId}
                    onChange={this.handleChangeId}
                />
            </div>
        );

    }

    renderrightIconMenu(judge) {

        const iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left"
            >
                <MoreVertIcon color={grey400} />
            </IconButton>
        );

        return (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onClick={this.deleteJudge.bind(judge)}>Delete</MenuItem>
            </IconMenu>
        )
    }

    renderJudges() {

        let judges = this.props.judges;

        return judges.map((judge) => {
            return (
                <ListItem
                    key={judge._id.toString()}
                    primaryText={this.renderListItem(judge)}
                    rightIconButton={this.renderrightIconMenu(judge)}
                />
            )
        });
    }

    render() {
        return (
            <div>
                <br />
                <Card style={{ width: "90%", marginLeft: "5%" }}>

                    <CardActions style={{ display: "inline-block" }} >
                        <TextField
                            floatingLabelText="Name"
                            ref="nameInput"
                            style={{ float: "left", marginRight: 20, marginLeft: 20 }}
                        />
                        <TextField
                            floatingLabelText="ID"
                            ref="idInput"
                            style={{ float: "left", marginRight: 20 }}
                        />

                        <RaisedButton label="Add Judge"
                            onClick={this.addJudge.bind(this)}
                            primary={true} style={this.styleBtn}
                            style={{ float: "left", marginTop: 27 }} />
                    </CardActions>

                    <Divider />
                    <CardText style={{ padding: 0 }}>
                        <List style={{ padding: 0 }}>
                            {this.renderJudges()}
                        </List>
                    </CardText>
                </Card>

            </div>
        );
    }
}

JudgesManager.propTypes = {
    judges: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('judges');

    return {
        judges: Judges.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, JudgesManager);



