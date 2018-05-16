import React, { Component } from 'react';
import { Panel, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import {UserProfiles} from '../../collections/userProfiles.js';
import { Meteor } from 'meteor/meteor';
import { DanCollection } from '../../collections/danCollection.js';


/*TO ACCESS USERID SENT BY ROUTER USE "THIS.PROPS.MATCH.PARAMS.ID"*/

export class DanPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      levels: "",
    };

  }

  handleCLick(event){
    event.preventDefault();
    Meteor.call('danCollection.insert');
  }

  renderListItem(positionInArray,songNumber){
    
    if(songNumber==1){
      return <ListGroupItem>{this.props.danInfo[0].levels[positionInArray].song1.name}</ListGroupItem>;
    }else if(songNumber==2){
      return <ListGroupItem>{this.props.danInfo[0].levels[positionInArray].song2.name}</ListGroupItem>;
    }else if(songNumber==3){
      return <ListGroupItem>{this.props.danInfo[0].levels[positionInArray].song3.name}</ListGroupItem>;
    }else if(songNumber==4){
      return <ListGroupItem>{this.props.danInfo[0].levels[positionInArray].song4.name}</ListGroupItem>;
    }
    
    /*
    db.danCollection.update(
      {_id: "uboptsMGQFCW7kntx"},
      { $set:
        {
          "levels.1": {song1 : { name: "werer", passed: false },song2 : { name: "osdf", passed: false },song3 : { name: "osdf", passed: false },song4 : { name: "osdf", passed: false }  }
        }
      }
    )
    */
  }

  componentDidMount(){
    if(this.props.danInfo[0]!=undefined){
      this.setState({
        levels: this.props.danInfo[0].levels,
      });
    }
  }

  renderSongShiet(){
    var rows = [];
    console.log(this.props.danInfo[0]);

    

    if(this.props.danInfo[0]!=undefined){
      
      for(i=0;i<this.props.danInfo[0].levels.length;i++){
          rows.push(
            <Panel key={i} >
              <Panel.Title toggle>
                <Panel.Heading>Level {i+1}</Panel.Heading>
              </Panel.Title>
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
      return <div>{rows}</div>;
    }
  }



  render() {

    

    return (
        <div>
        <Panel>
          <Panel.Body>
              <h1>Ranking</h1>
          </Panel.Body>  
        </Panel>
        <Panel>
          <Panel.Body>
          <Button onClick={this.handleCLick.bind(this)}>clickame</Button>

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