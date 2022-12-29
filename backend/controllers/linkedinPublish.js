const linkedinController = require('../controllers/linkedinController');

const publish = async (req,res) =>{
    const {  description } = req.body;
    console.log(req.body.description);
    console.log('above is the descr below userid')
    
   

    if (!Boolean(description) ) {
        console.log('one of the values is empty')
    } else {
        const content = {
           
            description: description,
            
            
        };

        try {
            const response = await linkedinController.publishContent(req, content);
            console.log('.......sending post.....')
            console.log('post sent')
            res.status(200)

        } catch (err) {
            console.log('.......post not sent.....')
            res.status(500)

        }
    }
}

module.exports ={ publish }