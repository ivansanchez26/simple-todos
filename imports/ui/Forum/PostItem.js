import React, { Component } from 'react';
import { Posts } from '../../collections/Posts';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Home from '../webpages/Home';

// Task component - represents a single todo item
export default class PostItem extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      isToggleOn: props.post.pinned,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  handleClick() {
    // Set the checked property to the opposite of its current value
	 	this.setState({
	 		isToggleOn: !this.state.isToggleOn,
	 	});
    Meteor.call('posts.setPinned', this.props.post._id, !this.state.isToggleOn);
  }

  deletePost(){
    Meteor.call('posts.remove', this.props.post._id);
    Bert.alert('Post removed.', 'success', 'growl-top-right'); 
  }

  parsePostCreationDate(date){
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();

    hour = date.getHours();
    minute = date.getMinutes();
    seconds = date.getSeconds();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return(dt +'/' + month + '/'+ year + ', ' + hour + ':' + minute + ':' + seconds);
  }

  getNComments(){
    var nComents = this.props.post.comments.length;

    if(nComents == 0){
      return 0;
    }else{
      return nComents;
    }
  }

  render() {    
    return (
        <div>
          <Row>
            <Col xs={1}>
            {
              Roles.userIsInRole(Meteor.userId(), 'Admins' )? 
              <div>
                {console.log(this.state.isToggleOn)}
                {this.state.isToggleOn ? 
                <Button onClick={this.handleClick} active>
                 <Glyphicon glyph="pushpin"/>
                </Button> : 
                <Button onClick={this.handleClick}>
                 <Glyphicon glyph="pushpin"/>
                </Button>}   
                             
                <Button onClick={this.deletePost}>
                <Glyphicon glyph="remove"/>
                </Button> 
              </div>:
              <div>
              {this.state.isToggleOn ? 
                <Button onClick={this.handleClick} disabled active>
                 <Glyphicon glyph="pushpin"/>
                </Button> : 
                <Button onClick={this.handleClick} disabled>
                 <Glyphicon glyph="pushpin"/>
                </Button>}  
              </div>
            }     
            </Col>
            <Col xs={9}> 
              <Link to={"/post/"+this.props.post._id}>{this.props.post.title}</Link><br/>
              <p>Submitted at <strong>{this.parsePostCreationDate(this.props.post.createdAt)}</strong> by {this.props.post.username}</p>
              </Col>
            <Col xs={2}>
              <p id="comentarios">{this.getNComments()}</p>
            </Col>
          </Row>
          <hr/>
        </div>
    );
  }
}