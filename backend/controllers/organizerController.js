const Organizer = require('../models/Organizer');
const Temple = require('../models/Temple');
const Darshan = require('../models/Darshan');
const Booking = require('../models/Booking');

// Organizer Login
exports.ologin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Organizer.findOne({ email });
        if (user) {
            if (user.password === password) {
                return res.json({
                    Status: "Success",
                    user: { id: user.id, name: user.name, email: user.email }
                });
            } else {
                return res.json("login fail");
            }
        } else {
            return res.json("no user");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Organizer Signup
exports.osignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existing = await Organizer.findOne({ email });
        if (existing) return res.json("Already have an account");

        await Organizer.create({ name, email, password });
        res.json("Account Created");
    } catch (err) {
        res.status(500).json({ error: "failed" });
    }
};

// Get all organizers
exports.getOrganizers = async (req, res) => {
    try {
        const organizers = await Organizer.find();
        res.status(200).json(organizers);
    } catch {
        res.sendStatus(500);
    }
};

// Get single organizer
exports.getOrganizerById = async (req, res) => {
    try {
        const organizer = await Organizer.findById(req.params.id);
        res.status(200).json(organizer);
    } catch {
        res.sendStatus(500);
    }
};

// Update organizer
exports.updateOrganizer = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const updated = await Organizer.findByIdAndUpdate(
            req.params.id,
            { name, email, password },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
};

// Delete organizer
exports.deleteOrganizer = async (req, res) => {
    try {
        const result = await Organizer.deleteOne({ _id: req.params.id });
        if (result) {
            res.status(200).json("Organizer has been deleted");
        } else {
            res.status(400).json("No such organizer is found to delete");
        }
    } catch {
        res.status(500).json("Server Error");
    }
};

// Create temple
exports.createTemple = async (req, res) => {
    const { organizerId, organizerName, templeName, location, open, close, description } = req.body;
    const templeImage = req.file?.path;
    try {
        const temple = new Temple({ organizerId, organizerName, templeName, location, open, close, description, templeImage });
        const saved = await temple.save();
        res.status(201).json(saved);
    } catch {
        res.status(400).json({ error: "Failed to create temple" });
    }
};

// Get temples by organizer
exports.getTempleByOrganizer = async (req, res) => {
    try {
        const temples = await Temple.find({ organizerId: req.params.organizerId }).sort("position");
        res.json(temples);
    } catch {
        res.status(500).json({ error: "Failed to fetch temples" });
    }
};

// Get all temples
exports.getTemples = async (req, res) => {
    try {
        const temples = await Temple.find();
        res.status(201).json(temples);
    } catch {
        res.status(400).json({ error: "Failed to get temples" });
    }
};

// Get temple by ID
exports.getTempleById = async (req, res) => {
    try {
        const temple = await Temple.findById(req.params.templeId);
        res.json(temple);
    } catch {
        res.status(500).json({ error: "Failed to fetch temple by ID" });
    }
};

// Update temple
exports.updateTemple = async (req, res) => {
    const { templeName, open, close, description, location } = req.body;
    try {
        let updateData = { templeName, open, close, description, location };
        if (req.file) updateData.templeImage = req.file.path;

        const updated = await Temple.findByIdAndUpdate(req.params.templeId, updateData, { new: true });
        res.json(updated);
    } catch {
        res.status(500).json({ error: "Failed to update temple" });
    }
};

// Delete temple
exports.deleteTemple = async (req, res) => {
    try {
        await Temple.deleteOne({ _id: req.params.id });
        res.status(200).json("Temple deleted");
    } catch {
        res.status(400).json({ msg: "No item found" });
    }
};

// Create darshan
exports.createDarshan = async (req, res) => {
    const { darshanName, open, close, vip, normal, description, prices, organizerId, organizerName, templeName, location, templeImage } = req.body;
    try {
        const darshan = new Darshan({ darshanName, open, close, vip, normal, description, prices, organizerId, organizerName, templeName, location, templeImage });
        const saved = await darshan.save();
        res.status(201).json(saved);
    } catch {
        res.status(400).json({ error: "Failed to create darshan" });
    }
};

// Get darshans by organizer
exports.getDarshanByOrganizer = async (req, res) => {
    try {
        const data = await Darshan.find({ organizerId: req.params.organizerId }).sort("position");
        res.json(data);
    } catch {
        res.status(500).json({ error: "Failed to fetch darshans" });
    }
};

// Get all darshans
exports.getDarshans = async (req, res) => {
    try {
        const data = await Darshan.find();
        res.status(201).json(data);
    } catch {
        res.status(400).json({ error: "Failed to get darshan" });
    }
};

// Get organizer bookings
exports.getOrganizerBookings = async (req, res) => {
    try {
        const data = await Booking.find({ organizerId: req.params.userId }).sort("position");
        res.json(data);
    } catch {
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get single darshan by ID
exports.getDarshanById = async (req, res) => {
    try {
        const darshan = await Darshan.findById(req.params.id);
        res.status(200).json(darshan);
    } catch {
        res.status(500).json({ error: "Failed to fetch darshan" });
    }
};

// Update Darshan
exports.updateDarshan = async (req, res) => {
    const { darshanName, open, close, vip, normal, description, prices, templeName, location } = req.body;
    try {
        let updateData = { darshanName, open, close, vip, normal, description, prices, templeName, location };
        if (req.file) updateData.templeImage = req.file.path;

        const updated = await Darshan.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updated);
    } catch {
        res.status(500).json({ error: "Failed to update darshan" });
    }
};

// Update Booking
exports.updateBooking = async (req, res) => {
    const { status, BookingDate, quantity } = req.body;
    try {
        const updated = await Booking.findByIdAndUpdate(
            req.params.id,
            { status, BookingDate, quantity },
            { new: true }
        );
        res.json(updated);
    } catch {
        res.status(500).json({ error: "Failed to update booking" });
    }
};
