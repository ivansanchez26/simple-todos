import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../collections/Posts';

import PostPage from '../webpages/PostPage';

/*TO ACCESS USERID SENT BY ROUTER USE "THIS.PROPS.MATCH.PARAMS.ID"*/

class Post extends Component {

  constructor(props){
    super(props);
    this.state = {
      post : this.props.post,
      ready : this.props.ready,
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps != this.props) {
      this.setState(() => ({
       post : this.props.post,
       ready : this.props.ready,
      }))
    }
   }

  render() {
    if(!this.state.ready){
      return ( <div>Loading</div>)
    }else{
      return (
        <div>
        <Panel>
          <Panel.Body>
            <h1><strong>{this.state.post[0].title}</strong></h1><br/>
            <PostPage post={this.state.post[0]}/>
          </Panel.Body>  
        </Panel>
        </div>
      );
    }
  }
} 

export default withTracker(props => {
  let postStuff = Meteor.subscribe('posts');
  const postId = props.match.params.id;
  return {
    ready: postStuff.ready(),
    post: Posts.find({_id:  postId}).fetch(),
  };
})(Post);