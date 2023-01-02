const request = require('request');
const { clientId, clientSecret, authorizationURL, redirectURI, accessTokenURL }= require('../config/config');
const Posts = require('../model/Post')

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

const PostingSchedules = async (req, description) => {
    // Rest of the function stays the same
    const url = 'https://api.linkedin.com/v2/ugcPosts';
    const body = {
      "author": 'urn:li:person:' + req.session.userId,
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
  
    // Rest of the function stays the same
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
  
  const sendPosts = async () => {
    // Find all posts with scheduledTime in the past and scheduleStatus not set to "sent"
    const posts = await Posts.find({
        scheduledTime: { $lte: new Date() },
        scheduleStatus: { $ne: "sent" }
    });
    console.log(posts)
  
    // Send each post and update the scheduleStatus to "sent"
    for (const post of posts) {
      const userID = post.userID;
      const description = post.description;
      const token = post.token;
      // You can pass in any request object as the first argument to the function
      // The second argument should be the post object itself
      await PostingSchedules({ session: { userId: userID, token: token } }, description);
      
      // Update the scheduleStatus to "sent"
      await Posts.updateOne({ _id: post._id }, { $set: { scheduleStatus: "sent" } });
    }
  };

  

const  publishContent = async(req,  content) =>{
    const url = 'https://api.linkedin.com/v2/ugcPosts';
    const {  description } = content;


    
    // BGN TEXT SHARE ON LINKEDIN
    const body = {
        "author": 'urn:li:person:' + req.session.userId,
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

const handleScheduling = async (req, res) => {

    if (!req?.body?.description || !req?.body?.scheduleTime ) {
        return res.status(400).json({ 'message': 'all details not added' })
    }

    try {
        const result = await Posts.create({
            "description": req.body.description,
            "userID": req.session.userId,
            "scheduledTime": req.body.scheduleTime,
            "token": req.session.token,
            "owner": req.body.owner
            
        });
        console.log(result);
        res.status(201).json({ 'success': `New post Scheduled  ` });
    } catch (err) {
        console.error(err);

    }
}


module.exports = { handleGettingUrl ,sendPosts, handleGetAccessToken,handleScheduling, getLinkedinId, publishContent }