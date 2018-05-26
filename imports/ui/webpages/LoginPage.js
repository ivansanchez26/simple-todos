import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import LoginRegisterBox from "../UserStuff/LoginRegisterBox";

export default class LoginPage extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <div>

        <LoginRegisterBox/>
        </div>
    );
  }
}