const express = require('express');
const path = require('path');
const os = require('os');
const app = express();

// Serve static content from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to get the EC2 hostname
app.get('/api/hostname', (req, res) => {
    const hostname = os.hostname(); // Get the EC2 instance hostname
    res.json({ hostname });
});

// API route to serve dynamic content from data.json
app.get('/api/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'data.json'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
