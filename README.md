# My Node.js Web Application

## Overview

This Node.js web application contains both static and dynamic content, including a sample API serving dynamic data.

## Directory Structure

```
/My-Node-JS-Web-Application
│
├── /data             
│   └── data.json     # Dynamic content served via API
│
├── /public           
│   ├── index.html    # Main HTML file
│   ├── style.css     # Stylesheet
│   ├── script.js     # JavaScript file for dynamic content
│   ├── hi.webp       # Image used in the header
│
├── app.js            # Main Node.js application file
├── package.json      # Dependencies for Node.js
└── README.md         # Instructions for deployment
```

## Prerequisites

- **Node.js** and **npm** installed.

## Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/swapnilyavalkar/My-Node-JS-Web-Application.git
   cd My-Node-JS-Web-Application/web-app
   ```

2. **Install Dependencies**:
   ```bash
   sudo apt update
   ccd ~
   curl -sL https://deb.nodesource.com/setup_20.x -o /tmp/nodesource_setup.sh
   sudo bash /tmp/nodesource_setup.sh
   sudo apt install nodejs
   npm install express
   ```

3. **Run the Application**:
   ```bash
   npm start
   ```

4. **Access the Web Application**:
   Visit `http://localhost:3000` in your browser.

## Code Snippets

### `app.js`

This is the main server file for the application, which serves static content and handles API routes.

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to serve dynamic content
app.get('/api/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'data.json'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

### `index.html`

This is the main HTML file served as the homepage.

```html
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
        <img src="hi.webp" alt="Hi GIF">
        <h1>Welcome to My Web Application,<br> Created by <a href="https://github.com/swapnilyavalkar">Swapnil Yavalkar</a></h1>
    </header>
    <section id="content">
        <h2>Static Content</h2>
        <p>This is a simple static content page, designed to give a warm and friendly vibe!</p>
    </section>
    <section id="dynamic-content">
        <h2>Dynamic Content (From API)</h2>
        <div id="api-data">Loading dynamic content...</div>
    </section>
    <script src="script.js"></script>
</body>
</html>
```

### `script.js`

This file fetches dynamic content from the API and displays it on the page.

```javascript
// Fetch dynamic content from the server API and display it
fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        const dataContainer = document.getElementById('api-data');
        dataContainer.innerHTML = '';
        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            const title = document.createElement('h3');
            title.innerText = item.title;
            const description = document.createElement('p');
            description.innerText = item.description;
            card.appendChild(title);
            card.appendChild(description);
            dataContainer.appendChild(card);
        });
    })
    .catch(err => console.error('Error fetching dynamic content:', err));
```

## API Endpoints

- **Static Content**: Available at the root URL (`/`).
- **Dynamic Content**: Available via `/api/data`.

---
