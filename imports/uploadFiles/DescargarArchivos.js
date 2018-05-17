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
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';



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


Template.uploadedFiles.onCreated(function () {
  this.state = new ReactiveDict();
  const instance = Template.instance();
  instance.state.set('songsLimit',6);
  instance.state.set('songSearchWord','');
  instance.state.set('searchDifficultyFrom',0);
  instance.state.set('searchDifficultyTo',21);
  Meteor.subscribe('songs');

});


Template.uploadedFiles.helpers({
  uploadedFiles: function () {
    return SongFiles.find();
  },
  uploadedSongs: function () {
    const instance = Template.instance();
    return Songs.find({name: {$regex: instance.state.get('songSearchWord'), $options: 'i'},difficulties:{$gte:parseInt(instance.state.get('searchDifficultyFrom')),$lte:parseInt(instance.state.get('searchDifficultyTo'))} },{sort: {createdAt:-1},limit: instance.state.get('songsLimit')});
  },
  equals: function(a, b) {
    return a == b;
  },
  buscarCancion: function(idArchivoCancion){
    return Songs.findOne({fileId : idArchivoCancion});
  },
  multipleDe3: function(numero){
    if ((numero+1) % 3 ==0)
      return true;
    else
    return false;
  }
  
  
  
});

Template.uploadedFiles.events({
  'click #loadMore'(event,template) {
    template.state.set('songsLimit',template.state.get('songsLimit')+6);
  },
  'change #searchSongInput': function (e, template) {
    var text = e.target.value;
    template.state.set('songSearchWord',text);
    template.state.set('songsLimit',6);

  },
  'change #searchDifficultyFrom': function (e, template) {
    var number = e.target.value.toString();
    if(number==''){
      number=0;
      
    }
    console.log(number);
    template.state.set('searchDifficultyFrom',number);
  },
  'change #searchDifficultyTo': function (e, template) {
    var number = e.target.value.toString();
    if(number=='')
      number=21;
    template.state.set('searchDifficultyTo',number);

  },
  'click #searchButton'(event,template) {

  },
})


Template.Song.helpers({
  buscarArchivo: function(idArchivo){
    return SongFiles.findOne({_id: idArchivo});
  },
  buscarImagenArchivo: function(idImagenArchivo){
    var asdf = SongImages.findOne({_id: idImagenArchivo});
    return SongImages.findOne({_id: idImagenArchivo});
  },
  biggerThan15: function(number){
    if(number>=15)
      return true;
    else
      return false;
  },
  biggerThan10: function(number){
    if(number>=10)
      return true;
    else
      return false;
  },
  biggerThan5: function(number){
    if(number>=5)
      return true;
    else
      return false;
  }


})



