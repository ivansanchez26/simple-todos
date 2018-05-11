import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, FormGroup, FormControl, Form, Col, Checkbox, Button } from 'react-bootstrap';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Meteor } from 'meteor/meteor';

export default class Register extends Component {
  
  
  render() {

    return (
        <Panel>
            <Panel.Body>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalUsername">
                    <Col  sm={2}>
                        Username
                    </Col>
                    <Col sm={10}>
                        <FormControl type="text" placeholder="Username" />
                    </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                    <Col  sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Password" />
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