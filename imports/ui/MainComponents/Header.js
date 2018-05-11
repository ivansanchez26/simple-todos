import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import AccountsUIWrapper from '../AccountsUIWrapper';


export default class Header extends Component {
    render() {
      return (
        <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" id="logo" className="navbar-brand">Logo</Link>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/downloads">Downloads</Link></li>
            <li><Link to="/howto">How to play</Link></li>
            <li><Link to="/forum">Forum</Link></li>
            <li><AccountsUIWrapper/></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/signUp"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
            <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Log in</Link></li>
          </ul>
        </div>
      </nav>  
      );
    }
  }
