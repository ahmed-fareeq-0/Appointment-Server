const crypto = require('crypto');

const passwordHash = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

module.exports = { passwordHash };
