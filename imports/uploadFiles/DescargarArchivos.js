import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import "./uploadTemplates.html";
import { ListGroupItem, Button } from 'react-bootstrap';
import SongFiles from '/lib/songFiles.collection.js';
import SongImages from '/lib/songImages.collection.js';
import { Songs } from '/imports/collections/songs.js';
import { ReactiveVar } from 'meteor/reactive-var';

import { withTracker } from 'meteor/react-meteor-data';


 
export default class DescargarArchivos extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.uploadedFiles,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return (
      <ListGroupItem>
        <span ref="container"/>
      </ListGroupItem>
    );
  }
}



Template.uploadedFiles.helpers({
  uploadedFiles: function () {
    return SongFiles.find();
  },
  uploadedSongs: function () {
    return Songs.find({});
  },
  equals: function(a, b) {
    return a == b;
  },
  buscarCancion: function(idArchivoCancion){
    console.log('hola');
    return Songs.findOne({fileId : idArchivoCancion});
  },
  
  
  
});

Template.Song.helpers({
  buscarArchivo: function(idArchivo){
    console.log('hola2');
    return SongFiles.findOne({_id: idArchivo});
  },buscarImagenArchivo: function(idImagenArchivo){
    console.log('hola3');
    var asdf = SongImages.findOne({_id: idImagenArchivo});
    console.log(asdf);
    return SongImages.findOne({_id: idImagenArchivo});
  }


})


