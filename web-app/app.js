const express = require('express');
const path = require('path');
const os = require('os'); // Import the os module to get the hostname
const app = express();

// Serve static content from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Dynamic content API
app.get('/api/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'data.json'));
});

// Root route - Inject EC2 hostname into the static HTML
app.get('/', (req, res) => {
    const hostname = os.hostname(); // Get the EC2 instance hostname
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Web Application</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <header>
                <h1>Welcome to My Web Application Hosted On EC2 Instance: ${hostname}</h1>
            </header>
            <section id="content">
                <h2>Static Content</h2>
                <p>This is a simple static content page.</p>
            </section>
            <section id="dynamic-content">
                <h2>Dynamic Content (From API)</h2>
                <div id="api-data"></div>
            </section>
            <script src="script.js"></script>
        </body>
        </html>
    `);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});