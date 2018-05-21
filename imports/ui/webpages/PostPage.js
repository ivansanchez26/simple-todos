import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, ListGroupItem, ListGroup, Table, Grid, Row, Col, Media } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'; 
import { Posts } from '../../collections/Posts';
import { PostList } from '../Forum/PostList.js';
import { Link } from 'react-router-dom';

export default class PostPage extends Component {

  constructor(props) {
    super(props);
  }

  parsePostCreationDate(date){
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();

    hour = date.getHours();
    minute = date.getMinutes();
    seconds = date.getSeconds();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return(dt +'/' + month + '/'+ year + ', ' + hour + ':' + minute + ':' + seconds);
  }


  renderPosts() {
    var comentarios = []

    if(this.props.post.comments){
      for(i=0;i<this.props.post.comments.length;i++){
        comentarios.push(
          <Media key={i}>
            <Media.Left>
              <img width={48} height={48} src="/images/blankavatar.jpg" alt="User photo" />
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                <Link to={"/profile/" + this.props.post.comments[i].owner}>{this.props.post.comments[i].username}</Link><small><i> - {this.parsePostCreationDate(this.props.post.comments[i].createdAt)}</i></small>
              </Media.Heading>
              <p>
                {this.props.post.comments[i].content}
              </p>
            </Media.Body>
            <hr/>
          </Media>
        );
      }
      return comentarios;
    }
    else{
      return (
        <p>There are no comments, be the first one</p>
      );
    }
  }

  onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      const text = ReactDOM.findDOMNode(this.refs.comment).value.trim();
      Meteor.call('comment.insert', text, this.props.post._id.toString());
      ReactDOM.findDOMNode(this.refs.comment).value = '';
    }
  }

  render() {
    return (
      <div>
        <Media>
          <Media.Left>
            <img width={48} height={48} src="/images/blankavatar.jpg" alt="User photo" />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              <Link to={"/profile/" + this.props.post.owner}>{this.props.post.username}</Link><small><i>{this.parsePostCreationDate(this.props.post.createdAt)}</i></small>
            </Media.Heading>
            <p>
              {this.props.post.content}
            </p>
            <hr/>
            {this.renderPosts()}
          </Media.Body>
        </Media>     
        {Meteor.userId() ? 
          <form>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea className="form-control" width={300} rows="5" ref="comment" id="comment" onKeyDown={this.onEnterPress}></textarea>
          </div> 
        </form> :  ''}
        </div>
      );
    }
  }