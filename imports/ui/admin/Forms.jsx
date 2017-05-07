import { Forms } from '../../api/forms.js';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import { createContainer } from 'meteor/react-meteor-data';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

class FormsManager extends React.Component {

    constructor(props) {
        super(props);
        Meteor.subscribe('forms');

        this.styleBtn = { margin: 12, };
    }

    deleteForm() {
        Meteor.call('forms.remove', this._id);
    }

    addForm(event) {
        const name = this.refs.nameInput.input.value.trim();

        let formObj = {
            formName: name,
        };
        Meteor.call('forms.insert', formObj);

        // Clear form
        this.refs.nameInput.input.value = '';        
    }

    handleChangeName = (event) => {
        Meteor.call('forms.setName', event.target.name,event.target.value);
    };

    renderListItem(form) {
        return (
            <h1>{form.formName}</h1>
        );

    }


    renderForms() {

        let forms = this.props.forms;

        return forms.map((form) => {
            return (
                <div key={form._id.toString()}>
                    <ListItem
                        primaryText={this.renderListItem(form)}
                    />
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                <br/>
                <Card style={{width:"90%", marginLeft: "5%"}}>
                    
                    <CardActions style={{ display: "inline-block" }} >
                        <TextField
                            floatingLabelText="Name"
                            ref="nameInput"
                            style={{ float: "left", marginRight: 20, marginLeft: 20 }}
                        />

                        <RaisedButton label="Add New Form"
                            onClick={this.addForm.bind(this)}
                            primary={true} style={this.styleBtn}
                            style={{ float: "left", marginTop: 27 }} />
                    </CardActions>

                    <Divider />
                    <CardText style={{padding:0}}>
                        <List>
                            {this.renderForms()}
                        </List>
                    </CardText>
                </Card>

            </div>
        );
    }
}

FormsManager.propTypes = {
    forms: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('forms');

    return {
        forms: Forms.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, FormsManager);



