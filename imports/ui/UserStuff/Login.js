import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, FormGroup, FormControl, Form, Col, Checkbox, Button } from 'react-bootstrap';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import Recaptcha from 'react-recaptcha';

export default class Login extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      tries: 0,
      captcha: false
    };

  }


  handleSubmit(event){
    event.preventDefault();
    var myemail = this.state.email;
    var myPassword = this.state.password;

    if(this.state.tries < 3){
      Meteor.loginWithPassword(myemail, myPassword, function(error)  {
        if (Meteor.user()) {
          Bert.alert('Succesful login','success','growl-bottom-right');
          window.location.href = '/';  
        } else {
          if(error.error == 403){
            this.setState({tries: this.state.tries + 1});
          }
          Bert.alert('Error: '+error.reason,'danger','growl-top-right');
        }
      }.bind(this));
    }else{
      var responses = grecaptcha.getResponse();
      if(responses.length !=0){
        Meteor.loginWithPassword(myemail, myPassword, function(error)  {
          if (Meteor.user()) {
            Bert.alert('Succesful login','success','growl-bottom-right');
            window.location.href = '/';  
          } else {
            Bert.alert('Error: '+error.reason,'danger','growl-top-right');
          }
        }.bind(this));
      }else{
        Bert.alert('Error: Captcha not checked!','danger','growl-top-right');
      }
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

  handleCaptcha(event) {
    event.preventDefault();
    this.setState({ captcha: event.target.value });
  }
  
  
  render() {

    return (
        <Panel>
          <Panel.Body>
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup controlId="formHorizontalemail">
                <Col sm={2}>
                  Email/Username
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Email/Username" name="email" onChange={this.handleInputChange.bind(this)} required/>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Password" name="password" onChange={this.handleInputChange.bind(this)} required/>
                </Col>
              </FormGroup>
              {
                this.state.tries >= 3 ? 
                <FormGroup>
                <Col smOffset={2} sm={10}>
                <Recaptcha
                  sitekey = "6LeJv1oUAAAAALHSgeUo1bFLM_fy1xao731JKeD2"
                  required
                />              
                </Col>
              </FormGroup> : ''
              }
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