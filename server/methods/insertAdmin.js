import { Meteor } from 'meteor/meteor';

Meteor.methods({
    insertAdmin() {
      let userId = Meteor.userId();
      if ( userId ) {
        Roles.addUsersToRoles( Meteor.userId(), ['Admins'] );
      }
    },
    insertAdminByUserName(userName){
        var user = Meteor.users.findOne({username: userName});
        if(user){
          user = Meteor.users.findOne({username: userName,roles: 'Admins'});
          if(!user){
            Roles.addUsersToRoles( user._id, ['Admins'] );
          }else{
            throw new Meteor.Error('User does already have admin permissions');
          }
        }else{
          throw new Meteor.Error('User not found');
        }
        
    }
});