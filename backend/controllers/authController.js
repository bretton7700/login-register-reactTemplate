const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail')

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const email = foundUser.email;
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                    
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '300s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        // console.log(result);
        // console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ email,roles, accessToken });

    } else {
        res.sendStatus(401);
    }
}

const handleReset = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ 'message': 'Email Required'});
    const foundUser = await User.findOne({ email}).exec();
    if (!foundUser) return res.sendStatus(401);

    const secret = process.env.ACCESS_TOKEN_SECRET + foundUser.password;
    const token = jwt.sign(
        {
            email: foundUser.email,
            id: foundUser._id },secret, {
                expiresIn: "5m",
            }
    );

    const link =`http://159.223.233.184:8000/reset-password/${foundUser._id}/${token}`;
    if(foundUser) {
        const msg = {
            to: foundUser.email,
            from: process.env.EMAIL_USER, // Change to your verified sender
            subject: 'PASSWORD RESET!',
            text: `You have requested the password reset link. Here you go ${link}`
        }
        sgMail.setApiKey(process.env.SENDGRID_PREMIUM_KEY)
    
        sgMail
            .send(msg)
            .then((response) => {
                console.log(response[0].statusCode)
                console.log(response[0].headers)
                return res.sendStatus(200);
            })
            .catch((error) => {
                console.error(error)
                console.log('there is an error')
            })

    }            
    
}

const passwordChangeget  = async(req,res) => {
    const { id, token }= req.params;
    console.log(req.params);
    const foundUser = await User.findOne({ _id: id}).exec();

    if(!foundUser) return res.status(400).json({ 'message': "User Doesn't Exist "});
    const secret = process.env.ACCESS_TOKEN_SECRET + foundUser.password;

    try{
        const verify = jwt.verify(token, secret);
        res.render("index", { email: verify.email, status: "Not Verified" });

    }catch(error){
        console.log(error);
        res.send("Your Token is Expired")
    }
}

const passwordchangepost  = async(req,res) =>{
    const {id, token} = req.params;
    const { password} = req.body;

    const foundUser = await User.findOne({ _id: id}).exec();
    if(!foundUser) return res.status(400).json({ 'message': "User Doesn't Exist "});
    const secret = process.env.ACCESS_TOKEN_SECRET + foundUser.password;

    try {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);

        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                }
            }
        );
        res.render("index", { email: verify.email, status: "verified" });
        
    }catch (error){
        console.log(error);
        res.json({status: "Something went wrong"})
    }
}

module.exports = { handleLogin, handleReset , passwordChangeget, passwordchangepost};