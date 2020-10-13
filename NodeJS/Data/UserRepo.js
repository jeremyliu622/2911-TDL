const User = require('../Models/User');

class UserRepo {
    UserRepo() {        
    }

    async getUserByName(username) {
        var user = await User.findOne({username:username});
        if(user) {
            let respose = { obj: user, errorMessage:"" }
            return respose;
        }
        else {
            return null;
        }
    }


   
}
module.exports = UserRepo;

