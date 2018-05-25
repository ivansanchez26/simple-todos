import React, { Component } from 'react';
import { Panel, ListGroupItem, ListGroup, Table, Grid, Row, Col } from 'react-bootstrap';

import { withTracker } from 'meteor/react-meteor-data'; 
import { Posts } from '../../collections/Posts';

import PostItem from './PostItem';

class PostList extends Component {
  renderPosts() {
    return this.props.posts.map((post) => (
        <PostItem key={post._id} post={post}/>
    ));
  }

    render() {
      return (
        <Grid>
          <Row>
              <Col xs={1}> </Col>
              <Col xs={9}>Title/Author</Col>
              <Col xs={2}>Comments</Col>
          </Row>
          <hr/>
          {this.renderPosts()}
        </Grid>
      );
    }
  }

export default withTracker(props => {
  Meteor.subscribe('posts');
  return {
    posts: Posts.find({title:{$regex: new RegExp(props.filter, "i")}},{sort:{pinned: -1,createdAt:-1}}).fetch(),
  };
})(PostList);