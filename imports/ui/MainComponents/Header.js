import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import AccountsUIWrapper from '../AccountsUIWrapper';
import { withTracker } from 'meteor/react-meteor-data';


export class Header extends Component {


  logOut(){
    Meteor.logout(function(error) {

      if(error) {
        Bert.alert( error.reason, 'danger', 'fixed-top' ); 
        console.log("ERROR: " + error.reason);
      }
   });
  }




  render() {
  
  //Shows an alert requiring to verify your account if you are logged without a verified one.
  var verifyAlert;
  //Shows a Log in button if user is not logged or a menu if the user is logged.
  var showLogin;

  //Shows a link to an admins page if the user is an admin
  var showLinkToAdminPage;

  if (this.props.currentUser) {
    //Set verifyAlert
    if(!this.props.currentUser.emails[0].verified){
      verifyAlert = <Alert bsStyle="warning">
      <strong>Hello {this.props.currentUser.emails[0].address}.</strong> You need to verify your account before you can access all the features we have to offer :)
    </Alert>;
    }

    linkToProfile = "/profile/"+this.props.currentUserId;
    linkToRanking = "/dan/"+this.props.currentUserId;

    if(Roles.userIsInRole( this.props.currentUserId, 'Admins' )){
      showLinkToAdminPage = <li><Link to="/admin">Admin page</Link></li>;
    }

    
    showLogin = <ul className="nav navbar-nav navbar-right">
                  <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">{this.props.currentUser.username} <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><Link to={linkToProfile}>My profile</Link></li>
                      <li><Link to={linkToRanking}>My ranking</Link></li>
                      <li className="divider"></li>
                      {showLinkToAdminPage}
                      <li><a href="#" onClick={this.logOut.bind(this)}>Log out</a></li>
                    </ul>
                  </li>
                </ul>;
    

  }else{
    showLogin = <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Log in</Link></li>
                </ul>;
  } 
  
    return (
      <div>
        <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" id="logo" className="navbar-left"><img src="/images/logo.png" alt="Logo"/></Link>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/downloads">Downloads</Link></li>
            <li><Link to="/forum">Forum</Link></li>
            <li><Link to="/start">Getting started</Link></li>
          </ul>
          {showLogin}
        </div>
        
      </nav>
      {verifyAlert}
    </div>  
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
  };
})(Header);