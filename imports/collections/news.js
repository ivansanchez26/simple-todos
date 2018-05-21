import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const News = new Mongo.Collection('news');


if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('news', function newsPublication() {
        return News.find({});
    });
  }

Meteor.methods({
    'news.insert'(title,content) {
    
    
      // Make sure the user is logged in before inserting a task
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      
      var created = new Date();

      News.insert({
        title,
        content,
        createdAt: created,
        uploader: this.userId,
      });

    },
    'news.remove'(newsId) {
      
      News.remove(newsId);
    },
  
  });