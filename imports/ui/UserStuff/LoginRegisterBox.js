import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, FormGroup, FormControl, Form, Col, Checkbox, Button, Nav, NavItem } from 'react-bootstrap';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Meteor } from 'meteor/meteor';
import Login from "./Login";
import Register from "./Register";
import { withTracker } from 'meteor/react-meteor-data';
import Link from 'react-router-dom/Link';



export class LoginRegisterBox extends Component {
    
    constructor(props) {
        super(props);
        this.state = {selectedTab: 1};
    }

    handleSelect(eventKey) {
        event.preventDefault();
        this.setState({selectedTab: eventKey});
    }

    render() {

        var loginButton;
        if (this.state.selectedTab==1) {
            loginButton = <Login />;
        } 
        else {
            loginButton = <Register />;
        }

        return (
            <Panel>
                <Panel.Body>
                {/*Shows the forms if there's no logged user*/}
                { !this.props.currentUser ?
                    <div>
                        <Nav bsStyle="tabs" activeKey={this.state.selectedTab.toString()} onSelect={k => this.handleSelect(k)}>
                        <NavItem eventKey="1">
                            Log In
                        </NavItem>
                        <NavItem eventKey="2">
                            Register
                        </NavItem>
                        </Nav>
                        {loginButton}
                    </div>
                     : <h3>You are logged in</h3>
                }
                    
                </Panel.Body>
            </Panel>
        );
    }
}

export default withTracker(() => {
    return {
      currentUser: Meteor.user(),
    };
  })(LoginRegisterBox);