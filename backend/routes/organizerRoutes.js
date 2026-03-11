const express = require('express');
const router = express.Router();
const organizerController = require('../controllers/organizerController');
const multer = require('multer');
const path = require('path');

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
router.use('/uploads',express.static('uploads'));

// ---------------- AUTH ----------------
router.post('/ologin', organizerController.ologin);
router.post('/osignup', organizerController.osignup);

// ---------------- ORGANIZER CRUD ----------------
router.get('/organizers', organizerController.getOrganizers);
router.get('/organizer/:id', organizerController.getOrganizerById);
router.put('/organizeredit/:id', organizerController.updateOrganizer);
router.delete('/organizerdelete/:id', organizerController.deleteOrganizer);

// ---------------- TEMPLE CRUD ----------------
router.post('/createtemple', upload.single('templeImage'), organizerController.createTemple);
router.get('/gettemple/:organizerId', organizerController.getTempleByOrganizer);
router.get('/gettemples', organizerController.getTemples);
router.get('/gettemplebyid/:templeId', organizerController.getTempleById);
router.put('/updatetemple/:templeId', upload.single('templeImage'), organizerController.updateTemple);
router.delete('/templedelete/:id', organizerController.deleteTemple);

// ---------------- DARSHAN CRUD ----------------
router.post('/createdarshan', organizerController.createDarshan);
router.get('/getdarshans/:organizerId', organizerController.getDarshanByOrganizer);
router.get('/getdarshans', organizerController.getDarshans);
router.get('/getdarshan/:id', organizerController.getDarshanById);
router.put('/updatedarshan/:id', upload.single('templeImage'), organizerController.updateDarshan);

// ---------------- BOOKINGS ----------------
router.get('/getorganizerbookings/:userId', organizerController.getOrganizerBookings);
router.put('/updatebooking/:id', organizerController.updateBooking);
router.delete('/eventdelete/:id', organizerController.deleteBooking);

module.exports = router;
