const SocialPost = require("social-post-api");
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
}



module.exports = { run }