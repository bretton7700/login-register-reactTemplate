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
            console.log(response)
            res.status(201).json({ 'success': `New post Published  ` });

        } catch (err) {
            console.log('.......post not sent.....')
            console.error(err);

        }
    }
}

module.exports ={ publish }