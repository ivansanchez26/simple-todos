import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import AccountsUIWrapper from '../AccountsUIWrapper';
import Switch from "react-router-dom/Switch";

import Home from "../webpages/Home";
import Downloads from "../webpages/Downloads";
import Howto from "../webpages/Howto";

import Dashboard from '../Forum/Dashboard';
import Post from '../Forum/Post';
import LoginPage from "../webpages/LoginPage";
import Profile from '../UserStuff/Profile';
import DanPage from '../DanStuff/DanPage';
import AdminPage from '../AdminStuff/AdminPage';

export default class Main extends Component {
    render() {
      return (
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/downloads" component={Downloads} />
                    <Route path="/howto" component={Howto} />

                    <Route exact path='/forum' component={Dashboard}/>
                    <Route path='/post/:id' component={Post}/>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/profile/:id" component={Profile} />                    
                    <Route path="/dan/:id" component={DanPage} />   
                    <Route path="/admin" component={AdminPage} />
                </Switch> 
            </main>
      );
    }
  }
