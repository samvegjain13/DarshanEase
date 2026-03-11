const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phno: String,
  quantity: String,
  totalamount: String,
  organizerName: String,
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer" },
  location: String,
  templeImage: String,
  templeName: String,
  darshanName: String,
  open: String,
  close: String,
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: String,
  BookingDate: {
    type: String,
    default: () => new Date().toLocaleDateString('hi-IN')
  },
  status: {
    type: String,
    default: 'Confirmed'
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
