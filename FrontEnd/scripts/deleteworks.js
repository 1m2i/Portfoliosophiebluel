
// document.addEventListener("DOMContentLoaded", function() {
//     const container = document.querySelector('.photo-mini-gallery');

//     fetch('http://localhost:5678/api/works')
//         .then(response => response.json())
//         .then(data => {
//             if (data && Array.isArray(data)) {
//                 data.forEach(work => {
//                     if (work.imageUrl) {
//                         // Create a wrapper div for each image and its delete icon
//                         const wrapper = document.createElement('div');
//                         wrapper.classList.add('image-wrapper');

//                         // Create an image element
//                         const img = document.createElement('img');
//                         img.src = work.imageUrl;
//                         img.alt = "Gallery Image";

//                         // Create a delete icon element
//                         const icon = document.createElement('i');
//                         icon.classList.add('fa', 'fa-regular', 'fa-trash-can');

//                         // Append image and icon to the wrapper
//                         wrapper.appendChild(img);
//                         wrapper.appendChild(icon);

//                         // Append the wrapper to the container
//                         container.appendChild(wrapper);
//                     }
//                 });
//             }
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });

document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.photo-mini-gallery');

    // Fetching the initial list of works
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            if (data && Array.isArray(data)) {
                data.forEach(work => {
                    if (work.imageUrl) {
                        const wrapper = document.createElement('div');
                        wrapper.classList.add('image-wrapper');
                        wrapper.dataset.id = work.id; // Store work ID for deletion

                        const img = document.createElement('img');
                        img.src = work.imageUrl;
                        img.alt = "Gallery Image";

                        const icon = document.createElement('i');
                        icon.classList.add('fa', 'fa-trash-can');
                        icon.style.cursor = 'pointer'; // Make icon clickable

                        wrapper.appendChild(img);
                        wrapper.appendChild(icon);
                        container.appendChild(wrapper);

                        // Adding event listener for deleting work
                        icon.addEventListener('click', () => deleteWork(work.id));
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));

    function deleteWork(workId) {
        fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("Sophie_Bluel_Architecte_JWT")}`
            }
        })
        .then(response => {
            if (response.ok) {
                // If the delete was successful, remove the element from the DOM
                const workToDelete = container.querySelector(`div[data-id="${workId}"]`);
                container.removeChild(workToDelete);
                console.log('Work deleted successfully!');
            } else {
                console.error('Failed to delete the work:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting work:', error));
    }
});
