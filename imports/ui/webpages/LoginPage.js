import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import LoginRegisterBox from "../UserStuff/LoginRegisterBox";

export default class LoginPage extends Component {
  render() {
    return (
        <div>
        <Panel>
          <Panel.Body>
              <h1>Log in/Register</h1>
          </Panel.Body>  
        </Panel>
        <LoginRegisterBox/>
        </div>
    );
  }
}