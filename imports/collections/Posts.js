import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('posts', function tasksPublication() {
      return Posts.find();
    });
  }


Meteor.methods({
    
    'posts.insert'(title,content) {
      check(title, String);
      check(content, String);
      // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
  
      Posts.insert({
        title,
        content,
        createdAt: new Date(),
        owner: this.userId,
        pinned: false,
        username: Meteor.users.findOne(this.userId).username
      });
    },
  
    'posts.remove'(postId) {
      check(postId, String);
      Posts.remove(postId);
    },
  
    'posts.setPinned'(postId, setChecked) {
      check(postId, String);
      check(setChecked, Boolean);
      Posts.update(postId, { $set: { pinned: setChecked } });
    },

    'comment.insert'(content){
      check(content, String); 

      var comment = {
        content : content,
        createdAt: new Date(),
        owner: this.userId,
        username: Meteor.users.findOne(this.userId).username
      }

      Posts.update(postId, { $set: { comment: comment } });
    }
  });