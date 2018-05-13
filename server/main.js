import { Meteor } from 'meteor/meteor';
import '/imports/collections/Posts.js';
import '../imports/collections/songs.js';
import '/lib/songFiles.collection.js';
import '../imports/collections/userProfiles.js';
import { Email } from 'meteor/email';


Meteor.startup(() => {
  // code to run on server at startup
  process.env.MAIL_URL = "smtps://postmaster@sandbox3f7f2ea19371458c82650f9d5dec5732.mailgun.org:2a8e70de22e50ca46d5dc1ada439ff11-97923b2d-d55c71b6@smtp.mailgun.org:465";
  
});
