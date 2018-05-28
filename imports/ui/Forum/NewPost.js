import React, { Component } from 'react';
import { Panel, Button, FormGroup, ControlLabel, FormControl, Modal, Form } from 'react-bootstrap';
import FieldGroup from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../../collections/Posts';


export default class NewPost extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false
        };
    }

    handleSubmit(event){
      event.preventDefault();
      this.setState({ show: false });
      // Find the text field via the React ref
      const title = ReactDOM.findDOMNode(this.inputTitle).value.trim();  
      const content = ReactDOM.findDOMNode(this.inputContent).value.trim(); 

      Meteor.call('posts.insert',title,content);

      // Clear form
      ReactDOM.findDOMNode(this.inputTitle).value = '';
      ReactDOM.findDOMNode(this.inputContent).value = '';
    }

    handleClose() {
      this.setState({ show: false });
    }
    
    handleShow() {
      this.setState({ show: true });
    }

  render() {
    function FieldGroup({ id, label, help, ...props }) {
        return (
            <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        );
    }
    
    return (
        <div>    
            <Button bsStyle="success" onClick={this.handleShow}>
                New post
            </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New post form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="Title"
                placeholder="Enter title here..."
                inputRef={(input) => this.inputTitle = input}
                required          
              />
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Content</ControlLabel>
                <FormControl 
                  componentClass="textarea" 
                  label="Post content"
                  placeholder="Enter post content here..." 
                  inputRef={(input) => { this.inputContent = input; }}
                  required
                />
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }
}