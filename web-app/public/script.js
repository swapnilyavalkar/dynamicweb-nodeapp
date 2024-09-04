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