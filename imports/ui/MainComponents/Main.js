import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import AccountsUIWrapper from '../AccountsUIWrapper';
import Switch from "react-router-dom/Switch";

import Home from "../webpages/Home";
import Downloads from "../webpages/Downloads";
import Started from "../webpages/Started";

import Dashboard from '../Forum/Dashboard';
import Post from '../Forum/Post';
import LoginPage from "../webpages/LoginPage";
import Profile from '../UserStuff/Profile';
import DanPage from '../DanStuff/DanPage';
import AdminPage from '../AdminStuff/AdminPage';
import SongDownload from '../Songs/SongDownload';

export default class Main extends Component {
    render() {
      return (
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/downloads" component={Downloads} />
                    <Route path="/start" component={Started} />

                    <Route exact path='/forum' component={Dashboard}/>
                    <Route path='/post/:id' component={Post}/>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/profile/:id" component={Profile} />                    
                    <Route path="/dan/:id" component={DanPage} />   
                    <Route path="/admin" component={AdminPage} />
                    <Route path="/song/:id" component={SongDownload} />
                </Switch> 
            </main>
      );
    }
  }
