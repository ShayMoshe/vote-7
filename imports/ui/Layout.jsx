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
                    <Link style={{ textDecoration: 'none' }} to={'/'} onClick={this.handleToggle}><MenuItem>Home</MenuItem></Link>
                    <Link style={{ textDecoration: 'none' }} to={'/Admin'} onClick={this.handleToggle}><MenuItem>Admin</MenuItem></Link>
                    <Link style={{ textDecoration: 'none' }} to={'/About'} onClick={this.handleToggle}><MenuItem>About</MenuItem></Link>
                </Drawer>
            </div>
        );
    }
}
