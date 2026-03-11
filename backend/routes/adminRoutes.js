const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/alogin', adminController.alogin);
router.post('/asignup', adminController.asignup);

module.exports = router;
