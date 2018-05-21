import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';




const ProfileImages = new FilesCollection({
  debug: true,
  collectionName: 'ProfileImages',
  allowClientCode: false, // Disallow remove files from Client
  storagePath: "/data/Meteor/uploads/images/profileImages",
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 1 && /png|jpe?g/i.test(file.extension)) { //&& /png|jpe?g/i.test(file.extension)
      return true;
    }
    return 'Please upload images in png/jpg/jpeg extension, with size equal or less than 1MB';
  }
});



if (Meteor.isServer) {
  ProfileImages.denyClient();
  Meteor.publish('files.profileImages.all', function () {
    return ProfileImages.find().cursor;
  });
} else {
  Meteor.subscribe('files.profileImages.all');
}

Meteor.methods({
  'profileImage.remove'(profileImageId) {
    SongImages.remove({_id: profileImageId});
  }
});

export default ProfileImages;