import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, FormGroup, FormControl, Form, Col, Checkbox, Button } from 'react-bootstrap';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Meteor } from 'meteor/meteor';

export default class Login extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

  }


  handleSubmit(event){
    event.preventDefault();
    console.log(event);
    var myUsername = this.state.username;
    var myPassword = this.state.password;

    Meteor.loginWithPassword(myUsername, myPassword, function(error) {

      if (Meteor.user()) {
          console.log(Meteor.userId());
      } else {
          console.log("ERROR: " + error.reason);
      }
    });
    
    
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    
  }
  
  render() {

    return (
        <Panel>
          <Panel.Body>
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup controlId="formHorizontalUsername">
                <Col  sm={2}>
                  Username
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Username" name="username" onChange={this.handleInputChange.bind(this)} required/>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col  sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Password" name="password" onChange={this.handleInputChange.bind(this)} required/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">Sign in</Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel.Body>
        </Panel>
    );
  }
}