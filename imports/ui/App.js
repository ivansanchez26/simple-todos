import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import '../uploadFiles/uploadTemplates.html';
import Blaze from 'meteor/gadicc:blaze-react-component';


import { images } from '../api/images.js'; 
import { Tasks } from '../api/tasks.js';
import { Songs } from '../api/songs.js';
import Task from './Task.js';
import Song from './Song.js';
import Gallery from './gallery.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

 
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

  handleSubmitSong(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.songName).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.songDescription).value.trim();

    Meteor.call('songs.insert', name);

    // Clear form
    //ReactDOM.findDOMNode(this.refs.textInput).value = '';
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
        <header>
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
          <form className="new-song" onSubmit={this.handleSubmitSong.bind(this)} >
              <input
                type="text"
                ref="songName"
                placeholder="Name of the song"
              />
              <input
                type="text"
                ref="songDescription"
                placeholder="Description of the song"
              />
              
              <input type="submit" value="Submit"/>
          </form>

        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
        <ul>
          {this.renderSongs()}
        </ul>
        
        <Gallery />

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

