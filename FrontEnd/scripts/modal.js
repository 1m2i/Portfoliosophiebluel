document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("edit-modal-mode");
    const closeButton = document.querySelector(".cross-modal");
    const backdrop = document.querySelector(".backdropFilter");
    const editButton = document.getElementById("edit-button");
    const modalUploadPhoto = document.querySelector(".modal-upload-photo");
    const modalDeletePhoto = document.querySelector(".modal-delete-photo");
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
    function openModal() {
      modal.style.display = "block";
      backdrop.style.display = "block";
      showDeletePhotoModal();
    }
    function closeModal() {
      modal.style.display = "none";
      backdrop.style.display = "none";
    }
  
    editButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);
    // Add event listeners for toggling
    addPhotoButton.addEventListener("click", showUploadPhotoModal);
    backButtonIcon.addEventListener("click", showDeletePhotoModal);
  
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  });