document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded for admin panel");
    showAdminPanel();
  });
  
  function showAdminPanel() {
    const sessionData = sessionStorage.getItem("Sophie_Bluel_Architecte_JWT");
    console.log("Session data retrieved:", sessionData);
    const editModeBanner = document.querySelector(".banner_edit_mode");
    console.log("Edit mode banner element:", editModeBanner);
    
    if (sessionData && JSON.parse(sessionData).token) {
      editModeBanner.style.display = 'block'; 
      console.log("Admin panel displayed");
    } else {
      editModeBanner.style.display = 'none'; 
      console.log("Admin panel hidden");
    }
  }
  
  // the projet-edit mode //
  
  document.addEventListener("DOMContentLoaded", function() {
    toggleEditMode();
});

function toggleEditMode() {
    const sessionData = sessionStorage.getItem("Sophie_Bluel_Architecte_JWT");
    const icon = document.querySelector(".project-header .fa-solid");
    const editSpan = document.querySelector(".project-header span");

    if (sessionData && JSON.parse(sessionData).token) {
        icon.style.display = 'inline'; // Show the icon
        editSpan.style.display = 'inline'; // Show the span
        console.log("Edit mode activated");
    } else {
        icon.style.display = 'none'; // Hide the icon
        editSpan.style.display = 'none'; // Hide the span
        console.log("Edit mode deactivated");
    }
}
