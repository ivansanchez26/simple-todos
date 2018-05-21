import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const UserProfiles = new Mongo.Collection('userProfiles');


if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('userProfiles', function userProfilesPublication() {
        return UserProfiles.find({});
    });
  }

Meteor.methods({
    'userProfiles.insert'(userId,realName,description,danLvl,uploadedSongs,username) {
    
      if(!this.userId){
        throw new Meteor.Error('not-authorized');
      }

      userId= this.userId;
   
      UserProfiles.insert({
        userId,
        realName,
        username,
        description,
        danLvl,
        uploadedSongs,
        createdAt: new Date(),
      });
    },
    'userProfiles.remove'(userProfileId) {
      
      if(this.userId!=userProfileId){
        throw new Meteor.Error('not-authorized');
      }

      UserProfiles.remove(userProfileId);
    },
    'userProfiles.updateNameDescription'(realName,description){

      if(!this.userId){
        throw new Meteor.Error('not-authorized');
      }

      UserProfiles.update({userId: this.userId},{$set: {"realName": realName, "description": description}});

    },
    'userProfiles.addNewSong'(songId,songName,songDifficulties){

      if(!this.userId){
        throw new Meteor.Error('not-authorized');
      }

      UserProfiles.update({userId: this.userId},{$push: {uploadedSongs: {$each: [{songId,songName,songDifficulties}] }}});

    },

    
   
  
  });