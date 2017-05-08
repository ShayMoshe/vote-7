import { Forms } from '../../api/forms.js';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import { createContainer } from 'meteor/react-meteor-data';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        Meteor.subscribe('forms');

        this.styleBtn = { margin: 12, };

        this.state = {
            expanded: false,
        };
    }


    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };

    handleChangeJudgesList = (event, index, values) => { 
        const id = this.props.data._id;
        // this.setState({ values });
        Meteor.call('forms.setJudges',id,values);
        console.log(this.state.values)
     }

    deleteForm() {
        const id = this.props.data._id;
        Meteor.call('forms.remove', id);
    }


    handleChangeName = (event) => {
        Meteor.call('forms.setName', this.props.data._id, event.target.value);
    };

    renderFormName() {
        let form = this.props.data;
        return (
            <TextField
                value={this.props.data.formName}
                onChange={this.handleChangeName}
            />
        )
    }

    menuItems() {
        return this.props.judges.map((name) => (
            <MenuItem
                key={name._id}
                insetChildren={true}
                checked={ this.props.data.judges && this.props.data.judges.includes(name.judgeId)}
                value={name.judgeId}
                primaryText={name.judgeName}
            />
        ));
    }

    renderJudgesList() {
        return (
            <SelectField
                multiple={true}
                hintText="Select a name"
                value={this.props.data.judges}
                onChange={this.handleChangeJudgesList.bind(this)}
            >
                {this.menuItems()}
            </SelectField>
        );
    }


    render() {
        let form = this.props.data;
        return (
            <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} style={{ width: "90%", marginLeft: "5%" }}>
                <CardHeader
                    title={form.formName}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <div>
                        {this.renderFormName()}
                        <br />
                        <p>Judges:</p>
                        {this.renderJudgesList()}
                    </div>
                </CardText>
                <Divider />

                <CardActions expandable={true} >
                    <RaisedButton label="Delete" secondary={true} style={this.styleBtn} onClick={this.deleteForm.bind(this)} />
                </CardActions>
            </Card>
        );
    }
}