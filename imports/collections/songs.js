import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import UserProfiles from './userProfiles';

export const Songs = new Mongo.Collection('songs');


if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('songs', function songsPublication() {
        return Songs.find({});
    });
  }

Meteor.methods({
    'songs.insert'(name,description,fileName,fileId,size,difficulties,imageId) {
    
    
      // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      
      var created = new Date();

      Songs.insert({
        name,
        description,
        fileName,
        fileId,
        size,
        difficulties,
        imageId,
        createdAt: created,
        owner: this.userId,
        username: Meteor.users.findOne(this.userId).username,
      });

      var songJustInserted = Songs.findOne({createdAt:created});
      
      //adds the song to the user's profile
      Meteor.call('userProfiles.addNewSong',songJustInserted._id,name,difficulties);


    },
    'songs.remove'(songId) {
   
      Songs.remove(songId);
    },

    'songs.find'(){

      return Songs.find({});
    }
   
  
  });