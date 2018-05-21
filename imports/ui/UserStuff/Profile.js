import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { OwnProfile } from './OwnProfile';
import { OtherProfile } from './OtherProfile';
import { NotFoundProfile} from './NotFoundProfile';
import {UserProfiles} from '../../collections/userProfiles.js';


/*TO ACCESS USERID SENT BY ROUTER USE "THIS.PROPS.MATCH.PARAMS.ID"*/

export class Profile extends Component {

  renderProfileName(){
    if(this.props.userProfile[0]!=undefined){
      return (
        <Panel>
          <Panel.Body>
            <h1>{this.props.userProfile[0].username}'s profile</h1>
          </Panel.Body>  
        </Panel>
      );
    }
  }

  
  render() {
    var profileToLoad = <NotFoundProfile/>;
    if(this.props.currentUserId==this.props.match.params.id){
      profileToLoad = <OwnProfile userProfile={this.props.userProfile[0]}/>;
    }else{
      if(this.props.userProfile.length!=0){
        profileToLoad = <OtherProfile userProfile={this.props.userProfile[0]}/>;
      }
    }

    return (
        <div>
          {this.renderProfileName()}
        <Panel>
          <Panel.Body>
              {profileToLoad}
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
  })(Profile);