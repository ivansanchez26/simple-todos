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
  instance.state.set('fileText',"");


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
    return SongImages.findOne({_id : idImagen});
  },
  fileText: function(){
    const instance = Template.instance();
    return instance.state.get('fileText');
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
      template.state.set('fileText',file.name);
    }


  },
  //When uploading/inputing a new image
  'change #imageInput'(e, template) {
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
          Bert.alert( "Your image has been successfully uploaded", 'success','growl-top-right');            

          Meteor.call('songImage.remove',template.state.get('myImageId'));
          template.state.set('myImageId', fileObj._id);
          
        }else{
          Bert.alert( "Error during upload: "+error.reason, 'danger');  
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
          toPush = parseInt(toPush);
          break;
        case 1:
          toPush = target.difficulty2.value;
          toPush = parseInt(toPush);
          break;
        case 2:
          toPush = target.difficulty3.value;
          toPush = parseInt(toPush);
          break;
        case 3:
          toPush = target.difficulty4.value;
          toPush = parseInt(toPush);
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
          Bert.alert( "Error during upload: "+error.reason, 'danger');  
        } else {
          Bert.alert( "Your song has been successfully uploaded", 'success');  
          //File has been uploaded so we insert our Song to the Mongo collection of Songs, IT WILL ALSO UPLOAD SOME SONG INFO TO THE USER PROFILE
          Meteor.call('songs.insert',name,description,fileObj.name,fileObj._id,(fileObj.size/1024/1024).toFixed(2),arrayDifficulties,template.state.get('myImageId'), );

          //Reload the page so the form gets resetted and the songs are shown correctly 
          //window.location.reload(false);

        }
        template.currentUpload.set(false);
      });

      uploadInstance.start();
    }else{
      Bert.alert( 'You need to upload a file before being able to upload a new song', 'warning' );
    }

  },
  //When changing the amount of difficulties
  'change #difficultyNumbers': function (event,instance) {
    instance.state.set('difficultyAmount', event.target.value);

  },
  
});
