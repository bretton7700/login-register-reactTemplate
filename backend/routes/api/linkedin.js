const express = require('express');
const router = express.Router();
const linkedinController = require('../../controllers/linkedinController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const linkedinCallback = require('../../controllers/linkedinCallbackController');


router.route('/')
    .get(verifyRoles(ROLES_LIST.User),linkedinController.handleGettingUrl)
    

router.route('/callback')
    .get(verifyRoles(ROLES_LIST.User),linkedinController.handleGettingUrl)

module.exports = router;