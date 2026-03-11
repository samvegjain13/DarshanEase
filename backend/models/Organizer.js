const mongoose = require('mongoose');

const OrganizerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organizer"
  }
});

module.exports = mongoose.model('Organizer', OrganizerSchema);
