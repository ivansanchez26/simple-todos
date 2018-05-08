import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import "./uploadTemplates.html";
import SongFiles from '/lib/songFiles.collection.js';
import SongImages from '/lib/songImages.collection.js';
import Songs from '/imports/collections/songs.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';

 
export default class FormSubida extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.uploadForm,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container"/>;
  }
}

var myFile;
//var myImageId;

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  this.imageUpload = new ReactiveVar(false);
  this.state = new ReactiveDict();
  const instance = Template.instance();
  instance.state.set('difficultyAmount',1);
  instance.state.set('myImageId',undefined);


});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  imageUpload() {
    Template.instance().imageUpload.get();
  },
  difficultyList: function () {
    const instance = Template.instance();
    var arrayToReturn = [];
    for( i=0;i<instance.state.get('difficultyAmount');i++){
      arrayToReturn.push(i+1);
    }
    return arrayToReturn;
  },
  imageUploaded: function(){
    const instance = Template.instance();
    var idImagen = instance.state.get('myImageId');
    return SongImages.find({_id : idImagen});
  }

});

Template.uploadForm.events({
  
  //When uploading/inputing a new file
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = e.currentTarget.files[0];
      myFile = file;
    }


  },
  //When uploading/inputing a new image
  'change #imageInput'(e, template) {
    console.log('aaaaaaaaaaaaa');
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const uploader = SongImages.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      uploader.on('start', function () {
        template.imageUpload.set(this);
      });

      uploader.on('end', (error, fileObj) => {
        template.imageUpload.set(false);
      });

      uploader.on('uploaded', (error, fileObj) => {
        if (!error) {
          window.alert('File "' + fileObj.name + '" successfully uploaded');
          template.state.set('myImageId', fileObj._id);
          console.log(template.state.get('myImageId'));
        }
      });

      uploader.on('error', (error, fileObj) => {
        window.alert('Error during upload: ' + error);
      });

      uploader.start();
    }
  },
  //When submitting the form
  'submit #formularioSubida'(event,template) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const name = target.nameInput.value;
    const description = target.descriptionInput.value;

    //Create array of difficulties
    var arrayDifficulties= [];
    for(i=0;i<template.state.get('difficultyAmount');i++){
      var toPush;
      switch(i){
        case 0:
          toPush = target.difficulty1.value;
          break;
        case 1:
          toPush = target.difficulty2.value;
          break;
        case 2:
          toPush = target.difficulty3.value;
          break;
        case 3:
          toPush = target.difficulty4.value;
          break;
      }

      arrayDifficulties.push(toPush);
    }
    

    var file = myFile;
    if (file) {
      var uploadInstance = SongFiles.insert({
        file: file,
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      uploadInstance.on('start', function() {
        template.currentUpload.set(this);
      });

      uploadInstance.on('end', function(error, fileObj) {
        if (error) {
          window.alert('Error during upload: ' + error.reason);
        } else {
          window.alert('File "' + fileObj.name + '" successfully uploaded');
          console.log(fileObj);
          //File has been uploaded so we insert our Song to the Mongo collection
          Meteor.call('songs.insert',name,description,fileObj.name,fileObj._id,(fileObj.size/1024/1024).toFixed(2),arrayDifficulties,template.state.get('myImageId'));
        }
        template.currentUpload.set(false);
      });

      uploadInstance.start();
    }

  },
  //When changing the amount of difficulties
  'change #difficultyNumbers': function (event,instance) {
    instance.state.set('difficultyAmount', event.target.value);

  },
  
});
