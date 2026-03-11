const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  }
});

module.exports = mongoose.model('Admin', AdminSchema);
