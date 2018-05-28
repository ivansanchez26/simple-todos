import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import NewPost from '/imports/ui/Forum/NewPost';
import PostList from '/imports/ui/Forum/PostList';
import { Panel, Form, InputGroup, FormControl, FormGroup, Button } from 'react-bootstrap';
import FieldGroup from 'react-bootstrap';

export class Dashboard extends Component {
constructor(props){
  super(props)
  this.onEnterPress = this.onEnterPress.bind(this)
  this.state = {
    filter: '',
  }
}

  onEnterPress = (e) => {
    if(e.keyCode == 13) {
      e.preventDefault();
      this.setState({
        filter: this.myInput.value.trim()
      });
    }
  }

  renderStuff(){
    if(this.props.currentUser){
      return(
        <form>
          <FormGroup>
                <InputGroup>
                <InputGroup.Button>
                    <NewPost/>
                  </InputGroup.Button>
                <FormControl 
                type="text" 
                inputRef={ref => { this.myInput = ref; }} 
                onKeyDown={this.onEnterPress.bind(this)}
                placeholder="Search post by title..."
                />
                </InputGroup>  
          </FormGroup>
        </form>   
      )
    }else{
      return(
        <form>
          <FormGroup>
             <FormControl 
                type="text" 
                inputRef={ref => { this.myInput = ref; }} 
                onKeyDown={this.onEnterPress.bind(this)}
                placeholder="Search post by title..."
              />
          </FormGroup>
        </form>   
      )
    }   
  }

  render() {
    return (
        <Panel>
          <Panel.Body>   
            {this.renderStuff()}    
              <br /> 
              <PostList filter={this.state.filter}/> 
          </Panel.Body>
        </Panel>    
    );
  }
}

export default withTracker(props => {
  return {
    currentUser: Meteor.user(), 
  };
})(Dashboard);