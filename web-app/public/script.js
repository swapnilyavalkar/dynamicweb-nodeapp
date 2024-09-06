// Fetch the hostname from the server and display it in the HTML
fetch('/api/hostname')
    .then(response => response.json())
    .then(data => {
        const hostnameElement = document.createElement('p');
        hostnameElement.style.fontSize = 'smaller';
        hostnameElement.style.color = 'black';
        hostnameElement.style.position = 'absolute'; // Make it position absolute
        hostnameElement.style.right = '80px'; // Align it to the right
        hostnameElement.style.bottom = '0px'; // Align it to the bottom
        hostnameElement.innerHTML = `Hosted On Server: <strong>${data.hostname}</strong>`;
        document.querySelector('header').appendChild(hostnameElement); // Append to the header
    })
    .catch(err => {
        console.error('Error fetching hostname:', err);
    });

// Fetch dynamic content from the server API and display it as cards
fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        const dataContainer = document.getElementById('api-data');
        dataContainer.innerHTML = ''; // Clear any existing content
        
        data.forEach(item => {
            // Create card elements
            const card = document.createElement('div');
            card.classList.add('card');
            
            // Insert the icon (SVG code)
            const iconContainer = document.createElement('div');
            iconContainer.innerHTML = item.icon;
            iconContainer.classList.add('icon');
            
            const title = document.createElement('h3');
            title.innerText = item.title;
            
            const description = document.createElement('p');
            description.innerText = item.description;
            
            const price = document.createElement('p');
            price.classList.add('price');
            price.innerText = item.price;
            
            // Append elements to the card
            card.appendChild(iconContainer); // Add the icon
            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(price);
            
            // Append the card to the container
            dataContainer.appendChild(card);
        });
    })
    .catch(err => {
        console.error('Error fetching dynamic content:', err);
    });
