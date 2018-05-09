import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Button, FormGroup, FormControl, Jumbotron, ListGroup, Navbar,Nav,NavItem } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import { Songs } from '../collections/songs.js';
import Song from './Downloads/Song.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import FormSubida from '../uploadFiles/FormSubida.js';
import DescargarArchivos from '../uploadFiles/DescargarArchivos.js';


import Home from './webpages/Home';
import Downloads from './webpages/Downloads';
import Howto from './webpages/Howto';
import Forum from './webpages/Forum';

import Header from './MainComponents/Header';
import Main from './MainComponents/Main';
 
// App component - represents the whole app
class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <Header/>
        <Main/>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('songs');
  Meteor.subscribe('posts');
  return {
    songs: Songs.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(App);