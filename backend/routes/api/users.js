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
    
router.route('/unique/:Database_Name')
    .get(verifyRoles(ROLES_LIST.User), usersController.getUniqueDatabase);

router.route('/createDB')
    .post(verifyRoles(ROLES_LIST.User), usersController.handleDatabaseCreation);

router.route('/uniqueWorkspaces')
    .get(verifyRoles(ROLES_LIST.User), usersController.getUniqueWorkspaces);
    
router.route('/availableTrials')
    .get(verifyRoles(ROLES_LIST.User), usersController.getWorkspaceTrials);

router.route('/createWorkspace')
    .post(verifyRoles(ROLES_LIST.User), usersController.handleWorkspaceCreation);
module.exports = router;