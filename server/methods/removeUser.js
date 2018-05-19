Meteor.methods({
    removeUserByUserName(userName){
        var user = Meteor.users.findOne({username: userName});
        if(user){
          Meteor.users.remove({username: userName});
        }else{
          throw new Meteor.Error('User not found');
        }
        
    }
});