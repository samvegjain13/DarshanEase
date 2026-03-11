require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
require('./config/db');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const organizerRoutes = require('./routes/organizerRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://darshanease.onrender.com", "https://darshanease-frontend.onrender.com"],
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));

// Routes
app.use('/user', userRoutes);
app.use('/organizer', organizerRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Port is listening at ${PORT}`);
});
