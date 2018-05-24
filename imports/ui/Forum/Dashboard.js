import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import NewPost from '/imports/ui/Forum/NewPost';
import PostList from '/imports/ui/Forum/PostList';
import { Panel, Form, InputGroup, FormControl, FormGroup, Button } from 'react-bootstrap';
import FieldGroup from 'react-bootstrap';

export class Dashboard extends Component {
  onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      const text = ReactDOM.findDOMNode(this.refs.filter).value.trim();
      Meteor.call('comment.insert', text, this.props.post._id.toString());
      ReactDOM.findDOMNode(this.refs.filter).value = '';
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
                <FormControl type="text" refs="filter" onKeyDown={this.onEnterPress}/>
                </InputGroup>  
          </FormGroup>
        </form>   
      )
    }else{
      return(
        <form>
          <FormGroup>
            <FormControl type="text" />
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
              <PostList/> 
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