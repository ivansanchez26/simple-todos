import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, ListGroupItem, ListGroup, Table, Grid, Row, Col, Media } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'; 
import { Posts } from '../../collections/Posts';
import PostList from '../Forum/PostList';

export default class PostPage extends Component {

  constructor(props){
    super(props);
  }

  //https://stackoverflow.com/questions/26281323/retrieve-all-elements-in-an-array-in-mongodb
  //https://forums.meteor.com/t/--foreach-vs-meteors-cursor-foreach-or---map-vs-meteors-cursor-map/3820

  getComments() {
    var idPost = this.props.match.params.id.toString(); //MrT44pyXhPyATGjwv
    console.log(idPost);
    var myPosts = Posts.find(
      {_id: idPost}
    ).fetch();

    console.log(myPosts);

    var myLikes = _.chain(myPosts)
    .pluck('comments')
    .flatten()
    .value();

    console.log(myLikes);

    return myLikes;
  }

  renderPosts(comments) {
    if(comments.isArray){
      console.log("PRUEBA");
    }else{
      console.log("PRUEBA2");
    }

    console.log(comments);
    comments.forEach(function(comment){
      return(
      <Media>
          {console.log(comment._id)}
          {console.log(comment.title)}
          <Media.Left>
            <img width={64} height={64} src="/thumbnail.png" alt="thumbnail" />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              {comment.username}<small><i>Fecha</i></small>
            </Media.Heading>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
              ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
              tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
              fringilla. Donec lacinia congue felis in faucibus.
            </p>
          </Media.Body>
        </Media>
      ); 
    });
  }

  onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      const text = ReactDOM.findDOMNode(this.refs.comment).value.trim();
      console.log('Prueba antes insert');
      Meteor.call('comment.insert', text, this.props.match.params.id.toString());
      ReactDOM.findDOMNode(this.refs.comment).value = '';
      console.log('Prueba después insert');
    }
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
              aaaa<small><i>Fecha</i></small>
            </Media.Heading>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
              ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
              tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
              fringilla. Donec lacinia congue felis in faucibus.
            </p>
            {this.renderPosts(this.getComments())}
          </Media.Body>
        </Media>     
        {Meteor.userId() ? 
          <form>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea className="form-control" rows="5" ref="comment" id="comment" onKeyDown={this.onEnterPress}></textarea>
          </div> 
        </form> :  ''}
      </Panel>
      </div>
      );
    }
  }