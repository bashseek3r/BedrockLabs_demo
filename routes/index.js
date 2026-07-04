const express = require('express');
const router = express.Router();

// GET Home Page
router.get('/', (req, res) => {
    res.render('index', {
        title: process.env.SITE_NAME || "Bedrock Diagnostic Lab",
        year: new Date().getFullYear() // Dynamically renders 2026
    });
});

// POST Appointment Route
router.post('/book-appointment', (req, res) => {
    const { name, phone, email, service, date, message } = req.body;
    
    // Process data here (e.g., save to database, send email, etc.)
    console.log("Appointment Received:", { name, phone, email, service, date, message });
    
    // Redirect or render success message
    res.send("Appointment booked successfully!");
});

module.exports = router;

