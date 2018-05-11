import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import NewPost from '/imports/ui/Forum/NewPost';
import PostList from '/imports/ui/Forum/PostList';
import { Panel } from 'react-bootstrap';

export default class Dashboard extends Component {
  render() {
    return (
        <Panel>
          <Panel.Body>
            {Meteor.userId() ? <NewPost/>:  ''}
            <br />
            <PostList/>  
          </Panel.Body>
        </Panel>    
    );
  }
}