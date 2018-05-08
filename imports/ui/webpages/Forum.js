import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import NewPost from '/imports/ui/Forum/NewPost';
import PostList from '/imports/ui/Forum/PostList';

export default class Forum extends Component {
    constructor(props, context){
        super(props, context);
    }

  render() {
    return (
        <div>
          {Meteor.user() ? <NewPost/>:  ''}          
          <br />
          <PostList/>  
        </div>    
    );
  }
}

