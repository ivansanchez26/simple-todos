import React, { Component } from 'react';
import { Songs } from '../api/songs.js';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { ListGroupItem, Button } from 'react-bootstrap';

export default class Song extends Component {
    
  

    render() {
      // Give tasks a different className when they are checked off,
      // so that we can style them nicely in CSS
      //{this.props.task.name} , {this.props.song.description}
      
      return (
        <ListGroupItem className="private">
          
   
          
          <span className="text">
            <strong>{this.props.song.username}</strong>: {this.props.song.name} , {this.props.song.description} , {this.props.song.idArchivo}
          </span>
        </ListGroupItem>
      );
    }
  }