const bcrypt = require("bcrypt");


const hashedpassword = async(password) => {
    return await bcrypt.hash(password, 12);
}

module.exports = hashedpassword;