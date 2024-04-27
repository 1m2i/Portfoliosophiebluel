document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.photo-mini-gallery');

    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            if (data && Array.isArray(data)) {
                data.forEach(work => {
                    if (work.imageUrl) {
                        const img = document.createElement('img');
                        img.src = work.imageUrl;
                        img.alt = ".photo-mini-gallery"; 
						
                        container.appendChild(img);
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
