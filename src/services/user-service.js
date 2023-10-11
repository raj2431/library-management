
const { ValidationError, NotFoundError, APIError } = require('../exceptions/app-exception');
const { UserRepository } = require('../repository');
const { GenerateOTP, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');

class UserService {

    /**
     * To user's signup
     * @param {*} body 
     * @returns 
     */
    async register(body) {
        let salt = await GenerateSalt();
        body.salt = salt;
        body.password = await GeneratePassword(body.password, salt);
        let user = await UserRepository.create(body);
        // we can send verification email
        return { user: user };
    }

    /**
     * To user's signin
     * @param {*} email 
     * @param {*} password 
     * @returns 
     */
    async login(email, password) {
        let user = await UserRepository.findByEmail(email);
        
        // check if account is exist or not
        if (!user) {
            throw new ValidationError("Account does not exist with provided email address");
        }

        if (!ValidatePassword(password, user.password, user.salt)) {
            throw new ValidationError("Invalid credential");
        }

        let token = await GenerateSignature({ user });
        return { user, token: token };
    }
}

module.exports = new UserService;