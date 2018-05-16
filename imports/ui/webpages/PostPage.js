import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, ListGroupItem, ListGroup, Table, Grid, Row, Col, Media } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'; 
import { Posts } from '../../collections/Posts';
import { PostList } from '../Forum/PostList.js';

export default class PostPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content:"",
      date: new Date(),
      comments: [],
      firstTime:true,
    };
  }

  componentDidMount(){
    if(this.props.post){
        this.setState({
          title : this.props.post.title,
          content : this.props.post.content,
          date : this.props.post.createdAt,
          comments : this.props.post.comments,
          firstTime : false,
        });
    }
  }

  componentDidUpdate(){
    if(this.state.firstTime){
        this.setState({
          title : this.props.post.title,
          content : this.props.post.content,
          date : this.props.post.createdAt,
          comments : this.props.post.comments,
          firstTime : false,
        });
    }
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

    console.log(this.props.post);

    if(this.state.comments){
      for(i=0;i<this.state.comments.length;i++){
        comentarios.push(
          <Media key={i}>
            <Media.Left>
              <img width={64} height={64} src="/thumbnail.png" alt="thumbnail" />
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                {this.props.post.comments[i].username}<small><i>{this.parsePostCreationDate(this.props.post.comments[i].createdAt)}</i></small>
              </Media.Heading>
              <p>
                {this.props.post.comments[i].content}
              </p>
            </Media.Body>
          </Media>
        );
      }
      return comentarios;
    }
    else{
      return (
        <p>No hay comentarios</p>
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
            <img width={64} height={64} src="/thumbnail.png" alt="thumbnail" />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              aaaa<small><i>Fecha</i></small>
            </Media.Heading>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
              ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
              tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
              fringilla. Donec lacinia congue felis in faucibus.
            </p>
            {this.renderPosts()}
          </Media.Body>
        </Media>     
        {Meteor.userId() ? 
          <form>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea className="form-control" rows="5" ref="comment" id="comment" onKeyDown={this.onEnterPress}></textarea>
          </div> 
        </form> :  ''}
        </div>
      );
    }
  }