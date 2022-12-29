const linkedinController = require('../controllers/linkedinController');

const publish = async (req,res) =>{
    const {  description,  userID } = req.body;
   

    if (!Boolean(description) || !Boolean(userID)) {
        console.log('one of the values is empty')
    } else {
        const content = {
           
            description: description,
            userID: userID
            
        };

        try {
            const response = await linkedinController.publishContent(req, content);
            console.log('.......sending post.....')
            console.log('post sent')

        } catch (err) {
            console.log('.......post not sent.....')

        }
    }
}

module.exports ={ publish }