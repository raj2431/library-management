const config = require("../config/config");
const User = require("../models/User");

class UserRepository {
    /**
     * To get user by primary Id
     * @param {*} Id 
     * @returns 
     */
    findById(Id) {
        return User.findOne({ _id: Id });
    }

    /**
     * To get user by email
     * @param {*} email 
     * @returns 
     */
    findByEmail(email) {
        return User.findOne({ email: email });
    }

    /**
     * To get user by username
     * @param {*} username 
     * @returns 
     */
    findByUserName(username) {
        return User.findOne({ username: username });
    }
}

module.exports = new UserRepository;