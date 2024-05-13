document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('edit-modal-mode');
    const closeButton = document.querySelector('.cross-modal');
    const backdrop = document.querySelector('.backdropFilter');
    const editButton = document.getElementById('edit-button');
    const container = document.querySelector('.photo-mini-gallery');
    const mainGallery = document.querySelector('.gallery');

    // Modal functions
    function openModal() {
        modal.style.display = 'block';
        backdrop.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        backdrop.style.display = 'none';
    }

    editButton.addEventListener('click', openModal);

    closeButton.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // Fetching the initial list of works
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            if (data && Array.isArray(data)) {
                data.forEach(work => {
                    if (work.imageUrl) {
                        const wrapper = createImageWrapper(work);
                        container.appendChild(wrapper);
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));

    function createImageWrapper(work) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('image-wrapper');
        wrapper.dataset.id = work.id;

        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = "Gallery Image";
        img.dataset.id = work.id;

        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-trash-can');
        icon.style.cursor = 'pointer';

        wrapper.appendChild(img);
        wrapper.appendChild(icon);

        // Attach the event listener to the delete icon
        icon.addEventListener('click', () => {
            const confirmDelete = confirm('Are you sure you want to delete this image?');
            if (confirmDelete) {
                deleteWork(work.id);
            }
        });

        return wrapper;
    }

    function deleteWork(workId) {
        console.log(workId);
        console.log("token", localStorage.getItem("Sophie_Bluel_Architecte_JWT"));

        fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem("Sophie_Bluel_Architecte_JWT")}`
            }
        })
        .then(response => {
            if (response.ok) {
                const workToDelete = container.querySelector(`div[data-id="${workId}"]`);
                if (workToDelete) {
                    container.removeChild(workToDelete);
                    removeFromMainGallery(workId);
                    console.log('Work deleted successfully!');
                }
                openModal(); // Ensure the modal remains open after deletion
            } else {
                console.error('Failed to delete the work:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting work:', error));
    }

    function removeFromMainGallery(workId) {
        const workToDeleteMainGallery = mainGallery.querySelector(`img[data-id="${workId}"]`);
        if (workToDeleteMainGallery) {
            mainGallery.removeChild(workToDeleteMainGallery.parentNode);
        }
    }
});

//uploading photos display

document.addEventListener("DOMContentLoaded", function () {
    
    const modalDeletePhoto = document.querySelector(".modal-delete-photo");
    const modalUploadPhoto = document.querySelector(".modal-upload-photo");
    const addPhotoButton = modalDeletePhoto.querySelector("button h3");
    const backButtonIcon = document.querySelector(".modal-header .fa-arrow-left");
  
   
    function showUploadPhotoModal() {
      modalDeletePhoto.style.display = "none";
      modalUploadPhoto.style.display = "block";
      backButtonIcon.style.display = "block";
    }

    function showDeletePhotoModal() {
      modalDeletePhoto.style.display = "block";
      modalUploadPhoto.style.display = "none";
      backButtonIcon.style.display = "none";
    }
  
    // Add event listeners for toggling
    addPhotoButton.addEventListener("click", showUploadPhotoModal);
    backButtonIcon.addEventListener("click", showDeletePhotoModal);
  });
  