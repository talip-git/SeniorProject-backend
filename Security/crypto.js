const crypto = require("crypto");

const initilization_vector = crypto.randomBytes(16);
const secretKey = "s6v9y/B?E(H+MbQeThWmZq4t7w!z%C&F";
const algorithm = "aes-256-cbc"

const createToken = (user_credentials)=>{
    const user = JSON.stringify(user_credentials);
    const cipher = crypto.createCipheriv(algorithm,secretKey,initilization_vector);
    let token = cipher.update(user,"utf-8","hex");
    token += cipher.final("hex");
    return token;
}
const decryptToken = (token)=>{
    const decipher = crypto.createDecipheriv(algorithm,secretKey,initilization_vector);

    let decrypted =  decipher.update(token,"hex","utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
}

module.exports = {
    createToken,
    decryptToken
}