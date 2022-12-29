const linkedinController = require('../controllers/linkedinController');

const getUserID = async (req,res) =>{
    const isAuthorized = (req.session.authorized);
    if (!isAuthorized) {
        console.log('Not Authorized')
    } else {
        try {
            const id = await linkedinController.getLinkedinId(req);
            req.session.userId  = id
            // BGN 13:18 CHECK IF WE GOT THE ID
            console.log('......the ID........')
            console.log(request.session.userId)
            res.json(id)
        } catch (err) {
            res.send(err);
        }
    }

}
module.exports ={ getUserID }