const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route('/interests/:email')
    .get(verifyRoles(ROLES_LIST.User), usersController.getUserInterests);

router.route('/update/:email')
    .put(verifyRoles(ROLES_LIST.User), usersController.updateUser);

router.route('/requestPremium')
    .post(verifyRoles(ROLES_LIST.User), usersController.handlePremiumRequest);

router.route('/purchases')
    .post(verifyRoles(ROLES_LIST.User), usersController.handlePurchases);
module.exports = router;