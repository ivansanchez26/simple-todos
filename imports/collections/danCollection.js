import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const DanCollection = new Mongo.Collection('danCollection');


if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('danCollection', function danCollectionPublication() {
        return DanCollection.find({userId:this.userId});
    });
  }

Meteor.methods({
    'danCollection.insert'() {
    
      if(!this.userId){
        throw new Meteor.Error('not-authorized');
      }
      userId= this.userId;
      maxLvl= 0;

      levels = [];
      //name = "asdf";
      //passed = false;
      song1 = {name:"Song name", passed:false};
      song2 = {name:"Song name", passed:false};
      song3 = {name:"Song name", passed:false};
      song4 = {name:"Song name", passed:false};
   
      DanCollection.insert({
        userId,
        maxLvl,
        levels,
        createdAt: new Date(),
      });

      for(i=0;i<20;i++){
        DanCollection.update({userId: this.userId},{$push: {levels: {$each: [{song1,song2,song3,song4}] }}});
      }
      



      


    },
    'danCollection.remove'(userProfileId) {
      if(this.userId!=userProfileId){
        throw new Meteor.Error('not-authorized');
      }
      UserProfiles.remove({userId: userProfileId});
    },
    'danCollection.updateNameDescription'(realName,description){
      if(!this.userId){
        throw new Meteor.Error('not-authorized');
      }
      UserProfiles.update({userId: this.userId},{$set: {"realName": realName, "description": description}});
    },

  });