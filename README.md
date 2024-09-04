# Web Application Overview

- **Static Content**: 
  - A simple HTML page styled with CSS and includes some JavaScript.
- **Dynamic Content**: 
  - Served using **Node.js** that dynamically fetches data and renders it on the webpage.

---

### **Web Application Structure**

```
/web-app
│
├── /public           # Static files
│   ├── index.html    # HTML file
│   ├── style.css     # CSS file
│   └── script.js     # JavaScript file
│
├── /data             # Dynamic content (API)
│   └── data.json     # Sample data served via API
│
├── app.js            # Main Node.js application file
├── package.json      # Node.js dependencies
```

---

### **Code for Static Content**

#### **HTML (`/public/index.html`)**

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
        <h1>Welcome to My Web Application, Created by <a href="https://github.com/swapnilyavalkar">Swapnil Yavalkar</a></h1>
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
```

#### **CSS (`/public/style.css`)**

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}
header {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1rem;
}
section {
    padding: 2rem;
}
h1, h2 {
    color: #333;
}
```

#### **JavaScript (`/public/script.js`)**

```javascript
// Fetch dynamic content from the server API and display it
fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        const dataContainer = document.getElementById('api-data');
        data.forEach(item => {
            const div = document.createElement('div');
            div.innerText = `Item: ${item.name}, Value: ${item.value}`;
            dataContainer.appendChild(div);
        });
    })
    .catch(err => {
        console.error('Error fetching dynamic content:', err);
    });
```

---

### **Code for Dynamic Content**

#### **Sample Data (`/data/data.json`)**

```json
[
    { "name": "Item 1", "value": 100 },
    { "name": "Item 2", "value": 200 },
    { "name": "Item 3", "value": 300 }
]
```

---

### **Node.js Server Code**

#### **Node.js (`app.js`)**

```javascript
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
```

#### **`package.json` (Node.js Dependencies)**

```json
{
  "name": "web-app",
  "version": "1.0.0",
  "description": "A simple web application with static and dynamic content",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

---

### **Instructions to Deploy and Run the Application**

#### **Step 1: Install Node.js**

1. **Ubuntu/Linux**:
   ```bash
   sudo apt update
   sudo apt install nodejs npm
   ```

2. **Amazon Linux 2**:
   ```bash
   sudo yum update -y
   sudo amazon-linux-extras install epel
   sudo yum install nodejs npm -y
   ```

#### **Step 2: Set Up the Application**

1. **Clone the Repository or Upload the Code**:
   - Clone this repository or upload the code to your EC2 instance:
     ```bash
     git clone https://github.com/your-username/web-app.git
     cd web-app
     ```

2. **Install Dependencies**:
   - In the project directory, run:
     ```bash
     npm install
     ```

#### **Step 3: Start the Application**

1. **Run the Node.js Application**:
   - Start the application by running:
     ```bash
     npm start
     ```

2. **Access the Application**:
   - Open a browser and go to `http://<EC2-Public-IP>:3000`.
   - You will see the static content along with the dynamic data fetched from the API.

---

### **Testing the Application**

1. **Test Static Content**:
   - Open the application in the browser and ensure the static content ("Welcome to My Web Application") is displayed correctly.

2. **Test Dynamic Content**:
   - Check the "Dynamic Content" section. The data from the API (e.g., `Item: Item 1, Value: 100`) should be displayed.
   - If dynamic content is not displayed, check the browser console for errors (use **F12** for DevTools).

---

### **Why Sections**

1. **Static Content**: 
   - **Why**: This content is easily served by the server without processing. It is used for assets like HTML, CSS, and JavaScript files.

2. **Dynamic Content**: 
   - **Why**: This part of the application serves data from an API (using `data.json`) to show how server-side dynamic content can be integrated into a web application.

3. **Node.js Server**: 
   - **Why**: Node.js is used for serving both static files and dynamic API responses. It's lightweight and ideal for this type of application.

4. **Express.js Framework**:
   - **Why**: Express is a minimal and flexible Node.js web application framework that provides tools to quickly build web servers.

---

### **Notes:**

- Use this web application as a base for all your projects.
- Modify the dynamic content as needed for different use cases.
- Scale this application by deploying it across multiple EC2 instances using a load balancer, Auto Scaling, and other AWS services.
