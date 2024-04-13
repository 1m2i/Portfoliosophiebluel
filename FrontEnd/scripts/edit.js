document.addEventListener("DOMContentLoaded", function() {
    showAdminPanel();
  });
  
  function showAdminPanel() {
    const sessionData = sessionStorage.getItem("Sophie_Bluel_Architecte_JWT");
    const editModeBanner = document.querySelector(".banner_edit_mode");
    if (sessionData && JSON.parse(sessionData).token) {
      editModeBanner.style.display = 'block'; // Display the banner if a token is present
    } else {
      editModeBanner.style.display = 'none'; // Otherwise, ensure it remains hidden
    }
  }

  // the projet-edit mode //

  document.addEventListener("DOMContentLoaded", function() {
    toggleEditMode();
  });
  
  function toggleEditMode() {
    const sessionData = sessionStorage.getItem("Sophie_Bluel_Architecte_JWT");
    const projectsEditDiv = document.querySelector(".projects_edit");
    const filterButtonsDiv = document.querySelector(".filter-buttons");
  
    if (sessionData && JSON.parse(sessionData).token) {
      projectsEditDiv.style.display = 'flex'; 
      filterButtonsDiv.style.display = 'none'; // Show the edit controls if a token is present
    } else {
      projectsEditDiv.style.display = 'none';  // Hide the edit controls if no token is present
      filterButtonsDiv.style.display = 'flex'; // Ensure filter buttons are always visible when no token
    }
  }
  
  