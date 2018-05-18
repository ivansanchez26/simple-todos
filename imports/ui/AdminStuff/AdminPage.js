import React, { Component } from 'react';
import { Panel, Button, ListGroup, ListGroupItem, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


export class AdminPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        giveAdminText: "",
        
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
                    />
                    <Button onClick={this.addAdmin.bind(this)}>Add Admin</Button>
                    </FormGroup>
            </div>
        );
        }else{
            return (
                <div>
                    <p>Bro pls u no admin</p><br/>
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