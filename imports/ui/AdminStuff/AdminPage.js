import React, { Component } from 'react';
import { Panel, Button, ListGroup, ListGroupItem, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


export class AdminPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        giveAdminText: "",
        removeUserText: "",
        banUserText: "",
        banUserReason: "",
        unbanUserText: "",
      };
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  addAdmin(event){
    Meteor.call('insertAdminByUserName',this.state.giveAdminText, (error, result) => {
        if (error)
            Bert.alert( error.error, 'danger', 'growl-top-right' );
        else
            Bert.alert( "User "+this.state.giveAdminText+" has now Admin permissions" , 'success', 'growl-top-right' );
    });    
  }

  removeUser(event){
    Meteor.call('removeUserByUserName',this.state.removeUserText, (error, result) => {
        if (error)
            Bert.alert( error.error, 'danger', 'growl-top-right' );
        else
            Bert.alert( "User "+this.state.removeUserText+" has been removed" , 'success', 'growl-top-right' );
    });    
  }

    banUser(event){
        Meteor.call('banUserByUserName',this.state.banUserText,this.state.banUserReason, (error, result) => {
            if (error)
                Bert.alert( error.error, 'danger', 'growl-top-right' );
            else
                Bert.alert( "User "+this.state.banUserText+" has been banned" , 'success', 'growl-top-right' );
        });    
    }
    unbanUser(event){
        Meteor.call('unbanUserByUserName',this.state.unbanUserText, (error, result) => {
            if (error)
                Bert.alert( error.error, 'danger', 'growl-top-right' );
            else
                Bert.alert( "User "+this.state.unbanUserText+" has been unbanned" , 'success', 'growl-top-right' );
        });    
    }

  showPage(){
      if(this.props.currentUser){
        if(Roles.userIsInRole( this.props.currentUserId, 'Admins' )){
        return (
            <div>
                <FormGroup controlId="formGiveAdmin">
                    <ControlLabel>Give admin to:</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.giveAdminText}
                        name="giveAdminText"
                        onChange={this.handleInputChange.bind(this)}
                        placeholder="Username..."
                    />
                    <Button onClick={this.addAdmin.bind(this)}>Add Admin</Button>
                </FormGroup>
                <FormGroup controlId="formRemoveUser">
                    <ControlLabel>Remove user:</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.removeUserText}
                        name="removeUserText"
                        onChange={this.handleInputChange.bind(this)}
                        placeholder="Username..."
                    />
                    <Button onClick={this.removeUser.bind(this)}>Remove User</Button>
                </FormGroup>
                <FormGroup controlId="formBanUser">
                    <ControlLabel>Ban user:</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.banUserText}
                        name="banUserText"
                        onChange={this.handleInputChange.bind(this)}
                        placeholder="Username..."
                    />
                    <FormControl
                        type="text"
                        value={this.state.banUserReason}
                        name="banUserReason"
                        onChange={this.handleInputChange.bind(this)}
                        placeholder="Reason..."
                    />
                    <Button onClick={this.banUser.bind(this)}>Ban User</Button>
                </FormGroup>
                <FormGroup controlId="formunbanUser">
                    <ControlLabel>Unban user:</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.unbanUserText}
                        name="unbanUserText"
                        onChange={this.handleInputChange.bind(this)}
                        placeholder="Username..."
                    />
                    <Button onClick={this.unbanUser.bind(this)}>Unban User</Button>
                </FormGroup>
            </div>
        );
        }else{
            return (
                <div>
                    <p>If you're not an admin you should be here</p><br/>
                    <img src="/images/bouncer.jpg"/>
                </div>
            )
        }
      }
  }

  render() {

    return (
        <div>
        <Panel>
          <Panel.Body>
              <h1>AdminPage</h1>
          </Panel.Body>  
        </Panel>
        <Panel>
          <Panel.Body>
            {this.showPage()}
          </Panel.Body>  
        </Panel>
        
        </div>
    );
  }
}

export default withTracker(props => {
    return {
        currentUser : Meteor.user(),
        currentUserId : Meteor.userId(),
    };
  })(AdminPage);