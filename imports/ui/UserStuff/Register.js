import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, FormGroup, FormControl, Form, Col, Checkbox, Button, HelpBlock } from 'react-bootstrap';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Meteor } from 'meteor/meteor';
import Link from 'react-router-dom/Link';

export default class Register extends Component {

  
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          username: "",
          password: "",
          passwordConfirm: "",
        };
    
      }
    
    
      handleSubmit(event){
        event.preventDefault();
        var myemail = this.state.email;
        var myPassword = this.state.password;
        
    
        //check that validations are fine to proceed
        if(this.getValidationStatePassword()=='success' && this.getValidationStatePasswordConfirm()=='success'){
            var registerData = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
             }
             var userId;
             Accounts.createUser( registerData, ( error ) => {
                if ( error ) {
                  Bert.alert( error.reason, 'danger' );
                  return;
                } else {
                  Meteor.call( 'sendVerificationLink', ( error, response ) => {
                    if ( error ) {
                      Bert.alert( error.reason, 'danger' );
                      return;
                    } else {
                      //Add an empty profile to the profile collection
                      Meteor.call('userProfiles.insert',userId,"","",0,[],registerData.username);
                      //Add an empty ranking to the dan Collection for the user
                      Meteor.call('danCollection.insert');
                      Bert.alert( 'Welcome!', 'success' );

                      //Add default admins if the username matches
                      if(registerData.username=="Ivanpotato" || registerData.username=="Shining"){
                        Meteor.call('insertAdmin');
                      }

                      window.location.href = '/';
                    }
                  });
                }
              });
              
              
              
          }
        
        
      }
    
      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
        
      }

      //Validate that password is at least 8 characters long
      getValidationStatePassword() {
        const length = this.state.password.length;
        if (length > 7) return 'success';
        else if (length > 0) return 'error';
        return null;
      }

      //validate that password in confirm is the same
      getValidationStatePasswordConfirm() {
        const firstPass = this.state.password;
        const secondPass = this.state.passwordConfirm;
        if (firstPass.length==0 || secondPass.length==0) return null;
        else if (firstPass==secondPass) return 'success';
        else if (firstPass!=secondPass) return 'error';
        return null;
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
                      <FormControl type="email" placeholder="Enter email" name="email" onChange={this.handleInputChange.bind(this)} required/>
                    </Col>
                  </FormGroup>
                  
                  <FormGroup controlId="formHorizontalUsername">
                    <Col  sm={2}>
                      Username
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Enter username" name="username" onChange={this.handleInputChange.bind(this)} required/>
                    </Col>
                  </FormGroup>
    
                  <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationStatePassword()}>
                    <Col  sm={2}>
                      Password
                    </Col>
                    <Col sm={10}>
                      <FormControl type="password" placeholder="Enter password" name="password" onChange={this.handleInputChange.bind(this)} required/>
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalPasswordConfirm" validationState={this.getValidationStatePasswordConfirm()}>
                    <Col  sm={2}>
                      
                    </Col>
                    <Col sm={10}>
                      <FormControl type="password" placeholder="Confirm Password" name="passwordConfirm" onChange={this.handleInputChange.bind(this)} required/>
                      <FormControl.Feedback />
                      <HelpBlock>Password must be at least 8 characters long.</HelpBlock>
                    </Col>
                  </FormGroup>
    
                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Button type="submit">Register</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Panel.Body>
            </Panel>
        );
      }
}