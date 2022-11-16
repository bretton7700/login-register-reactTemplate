const express = require('express');
const router = express.Router();
const parcelController = require('../../controllers/parcelController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin),parcelController.handleNewParcel)
    .get(verifyRoles(ROLES_LIST.Admin),parcelController.getAllParcels)
router.route('/:id')
    .delete(verifyRoles(ROLES_LIST.Admin),parcelController.deleteParcel)
router.route('/:id')
    .put(verifyRoles(ROLES_LIST.Admin),parcelController.updateParcel)
router.route('/:id')
    .put(verifyRoles(ROLES_LIST.Admin),parcelController.getParcel)
router.route('/:email')
    .get(verifyRoles(ROLES_LIST.User),parcelController.getUserParcels)
module.exports = router;