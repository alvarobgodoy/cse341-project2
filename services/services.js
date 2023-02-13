let sha1 = require('sha1');

const cleanObject = (obj) => {
    // Cleans any undefined or null attributes inside the given object
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

const hashPassword = (password) => {
    // Hashes the given password (simple hash without salts)
    return sha1(password);
}

module.exports = { cleanObject, hashPassword }