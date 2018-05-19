Meteor.methods({
    banUserByUserName(userName,banReason){
        var user = Meteor.users.findOne({username: userName});
        if(user){
          Meteor.users.update({username: userName},{$set:{isBanned:true,banReason: banReason}});
        }else{
          throw new Meteor.Error('User not found');
        }
        
    },
    unbanUserByUserName(userName){
        var user = Meteor.users.findOne({username: userName});
        if(user){
          Meteor.users.update({username: userName},{$set:{isBanned:false}});
        }else{
          throw new Meteor.Error('User not found');
        }
        
    },
});