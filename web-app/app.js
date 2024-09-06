const express = require('express');
const path = require('path');
const os = require('os');
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static content from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Dynamic content API
app.get('/api/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'data.json'));
});

// Root route - Render index.ejs with EC2 hostname
app.get('/', (req, res) => {
    const hostname = os.hostname(); // Get the EC2 instance hostname
    res.render('index', { hostname });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
