import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.js';

import App from '../imports/ui/App.js';


import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import SongFiles from '/lib/songFiles.collection.js';
import './main.html';
import { BrowserRouter } from 'react-router-dom';

 
Meteor.startup(() => {
  render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
    , document.getElementById('render-target'));
});







