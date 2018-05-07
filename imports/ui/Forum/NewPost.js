import React, { Component } from 'react';
import { Panel, Button, FormGroup, ControlLabel, FormControl, Modal } from 'react-bootstrap';
import FieldGroup from 'react-bootstrap';
import ReactDOM from 'react-dom';

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
      // Find the text field via the React ref
      const title = ReactDOM.findDOMNode(this.inputTitle).value.trim();  
      const content = ReactDOM.findDOMNode(this.inputContent).value.trim(); 

      Posts.insert({
        owner: Meteor.user().username,
        title,  
        content,
        pinned: false,
        createdAt: new Date(), // current time
      });

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
        <form>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New post form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FieldGroup
              id="formControlsText"
              type="text"
              label="Text"
              placeholder="Enter text"
              inputRef={(input) => this.inputTitle = input}              
              />
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Textarea</ControlLabel>
                <FormControl componentClass="textarea" placeholder="textarea" inputRef={(input) => { this.inputContent = input; }}/>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
            </Modal.Footer>
          </Modal>
        </form>
        </div>
    );
  }
}
