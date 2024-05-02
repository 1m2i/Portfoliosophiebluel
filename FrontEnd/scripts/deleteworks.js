
document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.photo-mini-gallery');

    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            if (data && Array.isArray(data)) {
                data.forEach(work => {
                    if (work.imageUrl) {
                        // Create a wrapper div for each image and its delete icon
                        const wrapper = document.createElement('div');
                        wrapper.classList.add('image-wrapper');

                        // Create an image element
                        const img = document.createElement('img');
                        img.src = work.imageUrl;
                        img.alt = "Gallery Image";

                        // Create a delete icon element
                        const icon = document.createElement('i');
                        icon.classList.add('fa', 'fa-regular', 'fa-trash-can');

                        // Append image and icon to the wrapper
                        wrapper.appendChild(img);
                        wrapper.appendChild(icon);

                        // Append the wrapper to the container
                        container.appendChild(wrapper);
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
