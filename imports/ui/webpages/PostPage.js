import React, { Component } from 'react';
import { Panel, ListGroupItem, ListGroup, Table, Grid, Row, Col, Media } from 'react-bootstrap';
import Meteor from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'; 
import { Posts } from '../../collections/Posts';
import PostList from '../Forum/PostList';

export class PostPage extends Component {
  constructor(props){
    super(props);
  }

  getComments() {
    return {
      comments: Posts.find({_id: this.props.post._id},{}).fetch(),
    };
  }

  renderPosts(commentList) {
    return commentList.map((post) => (
        <Media>
          <Media.Left>
            <img width={64} height={64} src="/thumbnail.png" alt="thumbnail" />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              aaa<small><i> Fecha</i></small>
            </Media.Heading>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
              ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
              tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
              fringilla. Donec lacinia congue felis in faucibus.
            </p>
          </Media.Body>
        </Media>
    ));
  }

  onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      this.myFormRef.submit();
    }
  }
  
  submitComment(){
    Meteor.call('comments.insert', );
  }

  render() {
    return (
      <div>
        <h1>TITULO POST</h1>
      <Panel>
        <Media>
          <Media.Left>
            <img width={64} height={64} src="/thumbnail.png" alt="thumbnail" />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              aaaa<small><i> Fecha</i></small>
            </Media.Heading>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
              ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
              tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
              fringilla. Donec lacinia congue felis in faucibus.
            </p>
          </Media.Body>
        </Media>
        {this.renderPosts()}
        <form>
          <div class="form-group">
            <label for="comment">Comment:</label>
            <textarea class="form-control" rows="5" id="comment" onKeyDown={this.onEnterPress}></textarea>
          </div> 
        </form>
      </Panel>
      </div>
      );
    }
  }

export default withTracker(() => {
  return {
    posts: Posts.find({$_id: this.props.post._id}).fetch(),
  };
})(PostPage);