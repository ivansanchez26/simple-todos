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

 
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
 
  }

  
  /*renderSongs() {
    let filteredSongs = this.props.songs;
    
    return filteredSongs.map((song) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
 
      return (
        <Song
          key={song._id}
          song={song}
        />
      );
    });
  }*/


  render() {
    return (
      <div>
        
      <Router>
                <div className="container">
                <br />
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand componentClass="span">
                            <Link to="/" id="logo">Logo</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem componentClass="span">
                            <Link to="/">Home</Link>
                        </NavItem>
                        <NavItem componentClass="span">
                            <Link to="/downloads">Downloads</Link>
                        </NavItem>
                        <NavItem componentClass="span">
                            <Link to="/howto">How to play</Link>
                        </NavItem>
                        <NavItem componentClass="span">
                            <Link to="/forum">Forum</Link>
                        </NavItem>
                        <NavItem>
                            <AccountsUIWrapper/>
                        </NavItem>
                    </Nav>
                </Navbar>

                <Route exact path="/" component={Home} />
                <Route path="/downloads" component={Downloads} />
                <Route path="/howto" component={Howto} />
                <Route path="/forum" component={Forum} />

                </div>
            </Router>
            
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('songs');
  Meteor.subscribe('posts');
  return {
    songs: Songs.find({},{ sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);

