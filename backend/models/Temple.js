const mongoose = require('mongoose');

const TempleSchema = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer" },
  organizerName: String,
  templeName: { type: String, required: true },
  description: { type: String, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
  location: { type: String, required: true },
  templeImage: { type: String, required: true }
});

module.exports = mongoose.model('Temple', TempleSchema);
