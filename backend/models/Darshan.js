const mongoose = require('mongoose');

const DarshanSchema = new mongoose.Schema({
  darshanName: String,
  templeName: String,
  templeImage: String,
  location: String,
  open: String,
  close: String,
  description: String,
  normal: String,
  prices: {
    normal: String,
    vip: String,
  },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer" },
  organizerName: String
});

module.exports = mongoose.model('Darshan', DarshanSchema);
