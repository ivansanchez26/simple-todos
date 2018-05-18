import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { OwnProfile } from './OwnProfile';
import { OtherProfile } from './OtherProfile';
import { NotFoundProfile} from './NotFoundProfile';
import {UserProfiles} from '../../collections/userProfiles.js';


/*TO ACCESS USERID SENT BY ROUTER USE "THIS.PROPS.MATCH.PARAMS.ID"*/

export class Profile extends Component {

  render() {
    var profileToLoad = <NotFoundProfile/>;
    var user;
    if(this.props.currentUserId==this.props.match.params.id){
      user = this.props.userProfile[0].username;
      profileToLoad = <OwnProfile userProfile={this.props.userProfile[0]}/>;
    }else{
      if(this.props.userProfile.length!=0){
        profileToLoad = <OtherProfile userProfile={this.props.userProfile[0]}/>;
        user = this.props.userProfile[0].username;
      }
    }

    return (
        <div>
        <Panel>
          <Panel.Heading>
            {console.log({user})}
            <h1>Profile</h1>
          </Panel.Heading>
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