import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';




const SongImages = new FilesCollection({
  debug: true,
  collectionName: 'SongImages',
  allowClientCode: false, // Disallow remove files from Client
  storagePath: "/data/Meteor/uploads/images",
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 10 && /png|jpe?g/i.test(file.extension)) { //&& /png|jpe?g/i.test(file.extension)
      return true;
    }
    return 'Please upload images in png/jpg/jpeg extension, with size equal or less than 10MB';
  }
});



if (Meteor.isServer) {
  SongImages.denyClient();
  Meteor.publish('files.songImages.all', function () {
    return SongImages.find().cursor;
  });
} else {
  Meteor.subscribe('files.songImages.all');
}

export default SongImages;