const linkedinController = require('../controllers/linkedinController');
const handleCallback = async (req, res) => {
    if(!req.query.code) {
        console.log("no code")
    }

    try {
        const data = await linkedinController.handleGetAccessToken(req);
        if(data.access_token){
            req.session.token = data.access_token;
            req.session.authorized = true;
        }

        console.log('token alright')
        
    } catch (err) {
        res.json(err)
    }

}

module.exports = { handleCallback }