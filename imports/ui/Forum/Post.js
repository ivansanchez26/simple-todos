import React, { Component } from 'react';
import { Posts } from '../../collections/Posts';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Forum from '../webpages/Forum';
import { Row, Col } from 'react-bootstrap';

const nComments = Posts.find({ comments: { $gt: 0 } }).count();

// Task component - represents a single todo item
export default class Post extends Component {
  router = this.context.router;

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Posts.update(this.props.post._id, {
      $set: { pinned: !this.props.post.pinned },
    });
  }


  render() {
    return (
      <Router>
        <div>
          <Row>
            <Col lg={1}>
            <input
            type="checkbox"
            readOnly
            checked={!!this.props.post.pinned}
            onClick={this.toggleChecked.bind(this)}
            />
            </Col>
            <Col lg={9}> 
            <Link to={"/forum/post/"+this.props.post._id}>{this.props.post.title}</Link>
            </Col>
            <Col lg={2}>
            {nComments}
            </Col>
            <Route exact path={"/forum/post/"+this.props.post._id} component={Forum} />
          </Row>
          <hr/>
        </div>
      </Router>
    );
  }
}