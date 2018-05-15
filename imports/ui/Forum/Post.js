import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../collections/Posts';
import PostPage from '../webpages/PostPage';

/*TO ACCESS USERID SENT BY ROUTER USE "THIS.PROPS.MATCH.PARAMS.ID"*/

export class Post extends Component {

  render() {
    return (
        <div>
        <Panel>
          <Panel.Body>
              {console.log(this.props.match.params.id)}
              {console.log(this.props.post)}
              <h1><strong>{this.props.post[0].title}</strong></h1>
              <PostPage post={this.props.post[0]}/>
          </Panel.Body>  
        </Panel>
        </div>
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe('posts');
  return {
    post: Posts.find({_id: props.match.params.id}).fetch(),
  };
})(Post);