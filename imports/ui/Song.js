import React, { Component } from 'react';
import { Songs } from '../api/songs.js';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class Song extends Component {
    
  
    render() {
      // Give tasks a different className when they are checked off,
      // so that we can style them nicely in CSS
      //{this.props.task.name} , {this.props.song.description}
   
      return (
        <li className="private">
          
   
          
          <span className="text">
            <strong>{this.props.song.username}</strong>: {this.props.song.name} , {this.props.song.description}
          </span>
        </li>
      );
    }
  }