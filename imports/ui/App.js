import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Button, FormGroup, FormControl, Jumbotron, ListGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';


import { Tasks } from '../api/tasks.js';
import { Songs } from '../api/songs.js';
import Task from './Task.js';
import Song from './Song.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import FormSubida from '../uploadFiles/FormSubida';
import DescargarArchivos from '../uploadFiles/DescargarArchivos';

 
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
    };
  }
  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Meteor.call('tasks.insert', text);
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    console.log("eee");
  }

  

 
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;
 
      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }
  
  renderSongs() {
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
  }


  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1>Todo List ({this.props.incompleteCount})</h1>
          
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
            </form> : ''
          }

        </Jumbotron>
 
        <ListGroup>
          {this.renderTasks()}
        </ListGroup>
        <ListGroup>
          {this.renderSongs()}
        </ListGroup>
        
        <FormSubida/>
        <ListGroup>
          <DescargarArchivos/>
        </ListGroup>

      </div>

    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');
  Meteor.subscribe('songs');
  return {
    tasks: Tasks.find({},{sort:{createdAt: -1}}).fetch(),
    songs: Songs.find({}).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);

