document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('edit-modal-mode');
    const closeButton = document.querySelector('.cross-modal');
    const backdrop = document.querySelector('.backdropFilter');
    const editButton = document.getElementById('edit-button');

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
});
