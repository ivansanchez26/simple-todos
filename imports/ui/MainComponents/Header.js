import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import AccountsUIWrapper from '../AccountsUIWrapper';


export default class Header extends Component {
    render() {
      return (
          <header>
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand componentClass="span">
                        <Link to="/" id="logo">Logo</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem componentClass="span">
                        <Link to="/">Home</Link>
                    </NavItem>
                    <NavItem componentClass="span">
                        <Link to="/downloads">Downloads</Link>
                    </NavItem>
                    <NavItem componentClass="span">
                        <Link to="/howto">How to play</Link>
                    </NavItem>
                    <NavItem componentClass="span">
                        <Link to="/forum">Forum</Link>
                    </NavItem>
                    <NavItem>
                        <AccountsUIWrapper/>
                    </NavItem>
                </Nav>
            </Navbar>
          </header>
      );
    }
  }
