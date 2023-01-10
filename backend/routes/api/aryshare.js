const express = require('express');
const router = express.Router();
const aryshareController = require('../../controllers/aryshareController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/publish')
    .post(verifyRoles(ROLES_LIST.User),aryshareController.run)


module.exports = router;