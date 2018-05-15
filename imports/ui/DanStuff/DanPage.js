import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import {UserProfiles} from '../../collections/userProfiles.js';
import { Meteor } from 'meteor/meteor';


/*TO ACCESS USERID SENT BY ROUTER USE "THIS.PROPS.MATCH.PARAMS.ID"*/

export class DanPage extends Component {


    handleCLick(event){
        event.preventDefault();
        Meteor.call('danCollection.insert');
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
              Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación Explicación 
                <Button onClick={this.handleCLick.bind(this)}>clickame</Button>
          </Panel.Body>  
        </Panel>

        </div>
    );
  }
}

export default withTracker(props => {
    Meteor.subscribe('userProfiles');
    return {
      currentUserId: Meteor.userId(),
      userProfile: UserProfiles.find({userId: props.match.params.id}).fetch(),
    };
  })(DanPage);