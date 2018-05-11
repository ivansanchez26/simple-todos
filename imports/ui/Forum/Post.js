import React, { Component } from 'react';
import { Posts } from '../../collections/Posts';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Home from '../webpages/Home';

const nComments = Posts.find({ comments: { $gt: 0 } }).count();

// Task component - represents a single todo item
export default class Post extends Component {
  constructor(props){
    super(props);
    this.state = {
      isToggleOn: false,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // Set the checked property to the opposite of its current value
	 	this.setState({
	 		isToggleOn: !this.state.isToggleOn,
	 	});
    Meteor.call('posts.setPinned', this.props.post._id, !this.state.isToggleOn);
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

  render() {
    return (
        <div>
          <Row>
            <Col xs={1}>
              <Button onClick={this.handleClick}>
                {this.state.isToggleOn ? <img src="/images/pinned.png"/> : <img src="/images/unpinned.png"/>}
              </Button>
            </Col>
            <Col xs={9}> 
              <Link to={"/forum/post/"+this.props.post._id}>{this.props.post.title}</Link><br/>
              <p>Submitted at <strong>{this.parsePostCreationDate(this.props.post.createdAt)}</strong> by {this.props.post.username}</p>
              </Col>
            <Col xs={2}>
              {nComments}
            </Col>
          </Row>
          <hr/>
        </div>
    );
  }
}