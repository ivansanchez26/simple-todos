import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, FormGroup, FormControl, Form, Col, Checkbox, Button } from 'react-bootstrap';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email'


export default class Login extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

  }


  handleSubmit(event){
    event.preventDefault();
    console.log(event);
    var myemail = this.state.email;
    var myPassword = this.state.password;

    Meteor.loginWithPassword(myemail, myPassword, function(error) {

      if (Meteor.user()) {
          console.log(Meteor.userId());
          Bert.alert('Succesful login','success','growl-top-right');
          
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
              <FormGroup controlId="formHorizontalemail">
                <Col  sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl type="email" placeholder="Email" name="email" onChange={this.handleInputChange.bind(this)} required/>
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