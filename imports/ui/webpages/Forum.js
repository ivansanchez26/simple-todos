import React, { Component } from 'react';
import NewPost from '/imports/ui/Forum/NewPost';
import PostList from '/imports/ui/Forum/PostList';

export default class Forum extends Component {
    constructor(props, context){
        super(props, context);
    }

  render() {
    return (
        <div>
          <NewPost/>
          <br />
          <PostList/>  
        </div>    
    );
  }
}