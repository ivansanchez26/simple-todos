import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import NewPost from '/imports/ui/Forum/NewPost';
import PostList from '/imports/ui/Forum/PostList';
import { Panel } from 'react-bootstrap';

import Dashboard from '../Forum/Dashboard';
import PostPage from '../webpages/PostPage';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

export default class Forum extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/forum' component={Dashboard}/>
        <Route path='/forum/:_id' component={PostPage}/>
      </Switch>   
    );
  }
}