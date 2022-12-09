const request = require('request');
const { clientId, clientSecret, authorizationURL, redirectURI, accessTokenURL }= require('../config/config');

const handleGettingUrl = async (req, res) => {
    const state = Buffer.from(Math.round(Math.random() * Date.now()).toString()).toString('hex');
    const scope = encodeURIComponent('r_liteprofile r_emailaddress w_member_social');
    const url = `${authorizationURL}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectURI)}&state=${state}&scope=${scope}`;
    console.log(url);
    res.json(url);
}

const handleGetAccessToken = async (req,res) =>{
    const { code } = req.query;
    const body ={
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectURI,
        client_id: clientId,
        client_secret: clientSecret
    };
    return new Promise((resolve, reject) => {
        request.post({url: accessTokenURL, form: body }, (err, response, body) =>
    { 
        if(err) {
            reject(err);
        }
        resolve(JSON.parse(body));
    }
    );
    });
}


module.exports = { handleGettingUrl , handleGetAccessToken }