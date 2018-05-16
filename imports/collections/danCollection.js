import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {UserProfiles} from './userProfiles.js';


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
      song1 = {name:"Song name", passed:false};
      song2 = {name:"Song name", passed:false};
      song3 = {name:"Song name", passed:false};
      song4 = {name:"Song name", passed:false};
      lvlPassed = false;
   
      DanCollection.insert({
        userId,
        maxLvl,
        levels,
        createdAt: new Date(),
      });

      for(i=0;i<20;i++){
        DanCollection.update({userId: this.userId},{$push: {levels: {$each: [{lvlPassed,song1,song2,song3,song4}] }}});
      }
      

    },
    'danCollection.remove'(userProfileId) {
      if(this.userId!=userProfileId){
        throw new Meteor.Error('not-authorized');
      }
      DanCollection.remove({userId: userProfileId});
    },
    'danCollection.updateSong'(levelsPosition,songPosition,passedState,lvlPassed,lvlUnpassed){
      if(!this.userId){
        throw new Meteor.Error('not-authorized');
      }

      var songToUpdate = "levels."+levelsPosition+".song"+songPosition+".passed";
     
      DanCollection.update(
        {userId: this.userId},
        {$set:{[songToUpdate]:!passedState}}
      );
      
      //Update maxLvl and userProfile danLvl
      if(lvlPassed){
        var lvl = DanCollection.findOne({userId:this.userId},{fields: {"maxLvl":1,_id:0}});
        if(lvl.maxLvl<levelsPosition+1){
          //sets the maxlvl in the dancollection
          DanCollection.update(
            {userId:this.userId},
            {$set: {maxLvl:Number(levelsPosition)+1}}
          );
          //sets the song field passed to true
          var songPassedToUpdate = "levels."+levelsPosition+".lvlPassed";
          DanCollection.update(
            {userId:this.userId},
            {$set: {[songPassedToUpdate]:true} }
          );
          //Sets the danLvl in the userprofile
          UserProfiles.update(
            {userId: this.userId},
            {$set: {danLvl: Number(levelsPosition)+1 }}
          );
        }
      }

      if(lvlUnpassed){
        //Updates song field passed to false
        var songPassedToUpdate = "levels."+levelsPosition+".lvlPassed";
          DanCollection.update(
            {userId:this.userId},
            {$set: {[songPassedToUpdate]:false} }
          );
        //Calculates the highest lvl completed from the entire list
        var levels = DanCollection.findOne({userId: this.userId},{fields:{_id:0,"levels":1}});
        var maxNumber=0;
        for(i=0;i<levels.levels.length;i++){
          if(levels.levels[i].lvlPassed){
            maxNumber=i+1;
          }
        }
        //Sets the maxlvl in the dancollection with the number calculated previously
        DanCollection.update(
          {userId:this.userId},
          {$set: {maxLvl:Number(maxNumber)}}
        );
        //Sets the maxlvl in the userprofile with the number calculated previously
        UserProfiles.update(
          {userId: this.userId},
          {$set: {danLvl: Number(maxNumber) }}
        );

      }
    },

  });