const express = require('express');
const router = express.Router();
const linkedinController = require('../../controllers/linkedinController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const linkedinCallback = require('../../controllers/linkedinCallbackController');
const linkedinUserID = require('../../controllers/linkedinUserID');
const publisher = require('../../controllers/linkedinPublish');


router.route('/')
    .get(verifyRoles(ROLES_LIST.User),linkedinController.handleGettingUrl)
    

router.route('/callback')
    .get(verifyRoles(ROLES_LIST.User),linkedinCallback.handleCallback)

router.route('/userID')
    .get(verifyRoles(ROLES_LIST.User),linkedinUserID.getUserID)
    
router.route('/publish')
    .post(verifyRoles(ROLES_LIST.User),publisher.publish)
router.route('/schedule')
    .post(verifyRoles(ROLES_LIST.User),linkedinController.handleScheduling)
    
module.exports = router;