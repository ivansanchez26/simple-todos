import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import SimpleSchema from 'simpl-schema';


var mySchema = _.extend(FilesCollection.schema, {
  nombre: {
    type: String,
    optional: true
  },
  descripcion: {
    type: String,
    optional: true
  }
});

const Images = new FilesCollection({
  debug: true,
  collectionName: 'Images',
  schema: mySchema,
  allowClientCode: false, // Disallow remove files from Client
  storagePath: "/data/Meteor/uploads/",
  onBeforeUpload: function (file) {
    // Allow upload files under 100MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 100 && /zip|rar/i.test(file.extension)) { //&& /png|jpe?g/i.test(file.extension)
      return true;
    }
    return 'Please upload file in rar/zip extension, with size equal or less than 100MB';
  }
});
Images.collection.attachSchema(new SimpleSchema(mySchema));



if (Meteor.isServer) {
  Images.denyClient();
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });
} else {
  Meteor.subscribe('files.images.all');
}

export default Images;
