// This function is called to show the admin panel based on session data
function showAdminPanel() {
    const sessionData = sessionStorage.getItem("Sophie_Bluel_Architecte_JWT");
    console.log("Session data retrieved:", sessionData);

    const editModeBanner = document.querySelector(".banner_edit_mode");
    const otherSections = document.querySelector('.other-sections');
    const filterSection = document.querySelector('.filter-buttons');
    const loginLink = document.querySelector('a[href="/pages/login.html"]'); 

    if (sessionData && JSON.parse(sessionData).token) {
        // Admin session is active
        editModeBanner.style.display = 'block';
        otherSections.style.display = 'block';
        filterSection.style.visibility = 'hidden';
        loginLink.textContent = 'logout';
        loginLink.href = '/pages/login.html'; 
        console.log("Admin panel displayed, other sections shown, filter buttons made invisible, login link changed to logout");
    } else {
        // No valid admin session
        editModeBanner.style.display = 'none';
        otherSections.style.display = 'none';
        filterSection.style.visibility = 'visible';
        loginLink.textContent = 'login'; // Revert text to 'login'
        loginLink.href = '/pages/login.html'; // Revert the href if it was changed
        console.log("Admin panel hidden, other sections hidden, filter buttons visible, login link reverted to login");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showAdminPanel();  // Call this function to check session and update 
});

