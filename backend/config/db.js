const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/yourdbname", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Database connected"))
.catch((err) => console.log("❌ DB Connection Failed:", err));
