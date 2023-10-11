const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { app_secret } = require("../config/config");

//Utility functions
module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
    return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
    try {
        return await jwt.sign(payload, app_secret, { expiresIn: "30d" });
    } catch (error) {
        return error;
    }
};

module.exports.ValidateSignature = async (req) => {
    try {
        const signature = req.get("Authorization");
        const payload = await jwt.verify(signature.split(" ")[1], app_secret);
        req.user = payload.user;
        return true;
    } catch (error) {
        return false;
    }
};

module.exports.GenerateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
