import React, { Component } from 'react';
import { Panel, ListGroupItem, ListGroup, Table, Grid, Row, Col, Media } from 'react-bootstrap';

import { withTracker } from 'meteor/react-meteor-data'; 
import { Posts } from '../../collections/Posts';

class PostList extends Component {
  constructor(props){
    super(props);
  }

  getComments() {
    return {
      commentList: Posts.find({_id: this.props.post._id},{}).fetch(),
    };
  }

  renderPosts(commentList) {
    return commentList.map((post) => (
        <p>Comentario</p>
    ));
  }

  render() {
    return (
        <Media>
          <Media.Left>
            <img width={64} height={64} src="/thumbnail.png" alt="thumbnail" />
          </Media.Left>
          <Media.Body>
            <Media.Heading>Media Heading</Media.Heading>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
              ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
              tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
              fringilla. Donec lacinia congue felis in faucibus.
            </p>
          </Media.Body>
        </Media>
      );
    }
  }