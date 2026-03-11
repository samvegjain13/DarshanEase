const Admin = require('../models/Admin');

// Admin Login
exports.alogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Admin.findOne({ email });
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
        return res.status(500).json({ error: err.message });
    }
};

// Admin Signup
exports.asignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existing = await Admin.findOne({ email });
        if (existing) return res.json("Already have an account");

        await Admin.create({ name, email, password });
        res.json("Account Created");
    } catch (err) {
        res.status(500).json({ error: "failed" });
    }
};
