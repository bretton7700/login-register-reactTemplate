const SocialPost = require("social-post-api");
const fetch = require("node-fetch");
const API_KEY = process.env.ARYSHARE_API_KEY; // get an API Key at ayrshare.com
const social = new SocialPost(API_KEY);
 
const run = async (req, res) => {
    /** post */
    const post = await social.post({
        post: req.body.description,
        platforms: req.body.selectedCheckboxes,
        mediaUrls: req.body.imageUrl ? [req.body.imageUrl] : undefined
    }).catch(console.error);
    console.log(post);
    res.status(201).json({ 'success': `New post Published  ` });
}


function generateRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  
  const randomString = generateRandomString();
    

function fetchProfile() {
  fetch("https://app.ayrshare.com/api/profiles/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      title: "Client " + randomString, // required
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch(console.error);
}




module.exports = { run ,fetchProfile}