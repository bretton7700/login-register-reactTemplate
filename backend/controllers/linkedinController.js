const request = require('request');
const { clientId, clientSecret, authorizationURL, redirectURI, accessTokenURL }= require('../config/config');

const handleGettingUrl = async (req, res) => {
    const state = Buffer.from(Math.round(Math.random() * Date.now()).toString()).toString('hex');
    const scope = encodeURIComponent('r_liteprofile r_emailaddress w_member_social');
    const url = `${authorizationURL}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectURI)}&state=${state}&scope=${scope}`;
    console.log(url);
    res.json(url);
}

const  getLinkedinId = async(req) => {
    return new Promise((resolve, reject) => {
        const url = 'https://api.linkedin.com/v2/me';
        const headers = {
            'Authorization': 'Bearer ' + req.session.token,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0' 
        };

        request.get({ url: url, headers: headers }, (err, response, body) => {
            if(err) {
                reject(err);
            }
            resolve(JSON.parse(body).id);
        });
    });
}

const  publishContent = async(req, linkedinId, content) =>{
    const url = 'https://api.linkedin.com/v2/ugcPosts';
    const {  description, userID } = content;


    
    // BGN TEXT SHARE ON LINKEDIN
    const body = {
        "author": 'urn:li:person:' + userID,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": description
                },
                "shareMediaCategory": "NONE"
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    };



   
//ARTICLE SHARE ON LINKEDIN
    
    const headers = {
        'Authorization': 'Bearer ' + req.session.token,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0',
        'x-li-format': 'json'
    };

    return new Promise((resolve, reject) => {
        request.post({ url: url, json: body, headers: headers}, (err, response, body) => {
            if(err) {
                reject(err);
            }
            resolve(body);
        });
    });

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


module.exports = { handleGettingUrl , handleGetAccessToken, getLinkedinId, publishContent }