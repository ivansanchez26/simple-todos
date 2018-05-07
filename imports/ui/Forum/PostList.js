import React, { Component } from 'react';

import { withTracker } from 'meteor/react-meteor-data'; 
import { Posts } from '../../collections/Posts';

import Post from './Post';

class PostList extends Component {
  renderPosts() {
    return this.props.posts.map((post) => (
      <Post key={post._id} post={post} />
    ));
  }

    render() {
      return (
        <ul>{this.renderPosts()}</ul>
      );
    }
  }

export default withTracker(() => {
  return {
    posts: Posts.find({},{sort:{pinned: -1,createdAt:-1}}).fetch(),
  };
})(PostList);