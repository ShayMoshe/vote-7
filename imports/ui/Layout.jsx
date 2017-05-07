import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class DrawerSimpleExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
        this.title = 'Vote-7';
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    render() {
        return (
            <div>
                <AppBar
                    title={this.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <Drawer open={this.state.open}
                    containerStyle={{ 'top': '65px' }}>
                    <MenuItem><Link to={'/1'}>Menu Item 1</Link></MenuItem>
                    <MenuItem><Link to={'/2'}>Menu Item 2</Link></MenuItem>
                    <MenuItem><Link to={'/Admin'}>Admin</Link></MenuItem>

                </Drawer>
            </div>
        );
    }
}
