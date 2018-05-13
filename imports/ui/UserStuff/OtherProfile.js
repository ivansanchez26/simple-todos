import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';


export class OtherProfile extends Component {


  render() {
    return (
        <div>
        <p>Other profile</p>
        </div>
    );
  }
}

export default withTracker(() => {
    return {
      currentUser: Meteor.user(),
    };
  })(OtherProfile);