import React, { Component } from 'react';
import { Posts } from '../../collections/Posts';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Forum from '../webpages/Forum';
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

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

  render() {
    return (
      <Router>
        <div>
          <Row>
            <Col xs={1}>
            <Button onClick={this.handleClick}>
              {this.state.isToggleOn ? <img src="/images/pinned.png"/> : <img src="/images/unpinned.png"/>}
            </Button>
            </Col>
            <Col xs={9}> 
            <Link to={"/forum/post/"+this.props.post._id}>{this.props.post.title}</Link>
            </Col>
            <Col xs={2}>
            {nComments}
            </Col>
            <Route exact path={"/forum/post/"+this.props.post._id} component={Forum} />
          </Row>
          <hr/>
        </div>
      </Router>
    );
  }
}