import React, { Component } from 'react';
import { Panel, ListGroupItem, ListGroup } from 'react-bootstrap';

import { withTracker } from 'meteor/react-meteor-data'; 
import { Posts } from '../../collections/Posts';

import Post from './Post';

class PostList extends Component {
  renderPosts() {
    return this.props.posts.map((post) => (
      <ListGroupItem key={post._id}>
        <Post post={post}/>
      </ListGroupItem>
    ));
  }

    render() {
      return (
        <Panel>
          <Panel.Heading>Title/Author nComments</Panel.Heading>
          <ListGroup>
            {this.renderPosts()}
          </ListGroup>
        </Panel>
      );
    }
  }

export default withTracker(() => {
  return {
    posts: Posts.find({},{sort:{pinned: -1,createdAt:-1}}).fetch(),
  };
})(PostList);