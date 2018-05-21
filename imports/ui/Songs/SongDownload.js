import React, { Component } from 'react';
import { Panel, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Songs } from '../../collections/songs.js';
import SongFiles from '/lib/songFiles.collection.js';
import SongImages from '/lib/songImages.collection.js';
import SongBody from './SongBody.js';

/*TO ACCESS SONGID SENT BY ROUTER USE "THIS.PROPS.MATCH.PARAMS.ID"*/

export class SongDownload extends Component {

  constructor(props) {
    super(props);

  }

  renderTitle(){
      if(this.props.Song){
        return <h1 className="text-center">{this.props.Song.name}</h1>;
      }
  }

  renderSong(){
    if(this.props.Song){
        return <SongBody Song={this.props.Song} currentUser={this.props.currentUser}/>;
    }
  }

  render() {

    

    return (
        <div>
       
        <Panel>
          <Panel.Body>
              {this.renderSong()}
          </Panel.Body>  
        </Panel>
        
        </div>
    );
  }
}

export default withTracker(props => {
    Meteor.subscribe('songs');
    return {
      currentUser : Meteor.user(),
      Song: Songs.findOne({_id: props.match.params.id}),
    };
  })(SongDownload);