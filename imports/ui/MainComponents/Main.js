import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import AccountsUIWrapper from '../AccountsUIWrapper';
import Switch from "react-router-dom/Switch";

import Home from "../webpages/Home";
import Downloads from "../webpages/Downloads";
import Howto from "../webpages/Howto";
import Forum from "../webpages/Forum";
import LoginPage from "../webpages/LoginPage";
import Profile from '../UserStuff/Profile';

export default class Main extends Component {
    render() {
      return (
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/downloads" component={Downloads} />
                    <Route path="/howto" component={Howto} />
                    <Route path="/forum" component={Forum} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/profile/:id" component={Profile} />                    
                </Switch> 
            </main>
      );
    }
  }
