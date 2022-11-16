const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd ,email,companyname,phonenumber,countryName,countryCode} = req.body;
    if (!user || !pwd || !email || !companyname || !phonenumber || !countryName || !countryCode) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    //find duplicate email in db
    const duplicate_email = await User.findOne({ email: email }).exec();
    if(duplicate_email) return res.sendStatus(410);

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd,
            "email":email,
            "companyname":companyname,
            "phonenumber":phonenumber,
            "countryName": countryName,
            "countryCode":countryCode

        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };