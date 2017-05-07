import React from 'react';
import { Link } from 'react-router-dom';
import Judeges from './Judges.jsx';
import Forms from './Forms.jsx';

import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const judegesIcon = <FontIcon className="material-icons">J</FontIcon>;
const formsIcon = <FontIcon className="material-icons">F</FontIcon>;

export default class Admin extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedIndex: 0,
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
                {this.renderContext()}
            </div>
        )
    }
}