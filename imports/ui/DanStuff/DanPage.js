import React, { Component } from 'react';
import { Panel, Button, ListGroup, ListGroupItem, Well } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import {UserProfiles} from '../../collections/userProfiles.js';
import { Meteor } from 'meteor/meteor';
import { DanCollection } from '../../collections/danCollection.js';


/*TO ACCESS USERID SENT BY ROUTER USE "THIS.PROPS.MATCH.PARAMS.ID"*/

export class DanPage extends Component {

  constructor(props) {
    super(props);

  }

  handleCLick(event){
    event.preventDefault();
    Meteor.call('danCollection.insert');
  }

  handleListItemClick(event){
    var res = event.target.id.split("/");
    var positionInArray = res[0];
    var songNumber = res[1];
    var stringOfPassed = res[2];
    var passed;
    var lvlPassed = false;
    var lvlUnpassed = false;
    if(stringOfPassed==1){
      passed = true;
    }else{
      paseed = false;
    }
    

    if(songNumber==1){
      if(!passed && this.props.danInfo[0].levels[positionInArray].song2.passed && this.props.danInfo[0].levels[positionInArray].song3.passed && this.props.danInfo[0].levels[positionInArray].song4.passed)
        lvlPassed = true;
    }else if(songNumber==2){
      if(this.props.danInfo[0].levels[positionInArray].song1.passed && !passed && this.props.danInfo[0].levels[positionInArray].song3.passed && this.props.danInfo[0].levels[positionInArray].song4.passed)
        lvlPassed = true;
    }else if(songNumber==3){
      if(this.props.danInfo[0].levels[positionInArray].song1.passed && this.props.danInfo[0].levels[positionInArray].song2.passed && !passed && this.props.danInfo[0].levels[positionInArray].song4.passed)
        lvlPassed = true;
    }else if(songNumber==4){
      if(this.props.danInfo[0].levels[positionInArray].song1.passed && this.props.danInfo[0].levels[positionInArray].song2.passed && this.props.danInfo[0].levels[positionInArray].song3.passed && !passed)
        lvlPassed = true;
    }

    if(this.props.danInfo[0].levels[positionInArray].song1.passed && this.props.danInfo[0].levels[positionInArray].song2.passed && this.props.danInfo[0].levels[positionInArray].song3.passed && this.props.danInfo[0].levels[positionInArray].song4.passed)
      lvlUnpassed=true;
    

    Meteor.call('danCollection.updateSong',positionInArray,songNumber,passed,lvlPassed,lvlUnpassed);
  }

  renderListItem(positionInArray,songNumber){
    
    var listId = positionInArray.toString()+"/"+songNumber.toString();

    if(songNumber==1){
      if(this.props.danInfo[0].levels[positionInArray].song1.passed)
        return <ListGroupItem bsStyle="success" id={listId+"/1"} onClick={this.handleListItemClick.bind(this)}>{this.props.danInfo[0].levels[positionInArray].song1.name}</ListGroupItem>;
      else
        return <ListGroupItem id={listId+"/0"} onClick={this.handleListItemClick.bind(this)}>{this.props.danInfo[0].levels[positionInArray].song1.name}</ListGroupItem>;
    }else if(songNumber==2){
      if(this.props.danInfo[0].levels[positionInArray].song2.passed)
        return <ListGroupItem bsStyle="success" id={listId+"/1"} onClick={this.handleListItemClick.bind(this)}>{this.props.danInfo[0].levels[positionInArray].song2.name}</ListGroupItem>;
      else
        return <ListGroupItem id={listId+"/0"} onClick={this.handleListItemClick.bind(this)}>{this.props.danInfo[0].levels[positionInArray].song2.name}</ListGroupItem>;
    }else if(songNumber==3){
      if(this.props.danInfo[0].levels[positionInArray].song3.passed)
        return <ListGroupItem bsStyle="success" id={listId+"/1"} onClick={this.handleListItemClick.bind(this)}>{this.props.danInfo[0].levels[positionInArray].song3.name}</ListGroupItem>;
      else
        return <ListGroupItem id={listId+"/0"} onClick={this.handleListItemClick.bind(this)}>{this.props.danInfo[0].levels[positionInArray].song3.name}</ListGroupItem>;
    }else if(songNumber==4){
      if(this.props.danInfo[0].levels[positionInArray].song4.passed)
        return <ListGroupItem bsStyle="success" id={listId+"/1"} onClick={this.handleListItemClick.bind(this)}>{this.props.danInfo[0].levels[positionInArray].song4.name}</ListGroupItem>;
      else
        return <ListGroupItem id={listId+"/0"} onClick={this.handleListItemClick.bind(this)}>{this.props.danInfo[0].levels[positionInArray].song4.name}</ListGroupItem>;
    }
    
  }



  renderSongShiet(){
    var rows = [];
    //console.log(this.props.danInfo[0]);

    
    if(this.props.danInfo[0]!=undefined){
      
      for(i=0;i<this.props.danInfo[0].levels.length;i++){
          
        if(this.props.danInfo[0].levels[i].song1.passed && this.props.danInfo[0].levels[i].song2.passed && this.props.danInfo[0].levels[i].song3.passed && this.props.danInfo[0].levels[i].song4.passed ){
          rows.push(
              <Panel key={i} bsStyle="success">
                <Panel.Heading>
                  <Panel.Title toggle>
                    Level {i+1}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <ListGroup>
                    {this.renderListItem(i,1)}
                    {this.renderListItem(i,2)}
                    {this.renderListItem(i,3)}
                    {this.renderListItem(i,4)}
                  </ListGroup>
                </Panel.Collapse>
              </Panel>
          );
        }else{
          rows.push(
            <Panel key={i}>
              <Panel.Heading>
                <Panel.Title toggle>
                  Level {i+1}
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <ListGroup>
                  {this.renderListItem(i,1)}
                  {this.renderListItem(i,2)}
                  {this.renderListItem(i,3)}
                  {this.renderListItem(i,4)}
                </ListGroup>
              </Panel.Collapse>
            </Panel>
          );
        }
      }
      return <div>{rows}</div>;
    }
  }



  render() {

    

    return (
        <div>

        <Panel>
          <Panel.Body>
            <Well>
              <p><strong>This is your user ranking. Use this to keep track of your progress in the game.</strong></p>
              <p><strong>How it works: each level contains 4 songs, any time you pass a song you can mark it as completed, when you pass all 4 songs the whole level will be marked as completed, the highest level completed will be shown on your profile.</strong></p>

            </Well>
            {this.renderSongShiet()}
          </Panel.Body>  
        </Panel>
        
        </div>
    );
  }
}

export default withTracker(props => {
    Meteor.subscribe('danCollection');
    return {
      danInfo: DanCollection.find().fetch(),
    };
  })(DanPage);