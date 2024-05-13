function showAdminPanel() {
    const token = localStorage.getItem("Sophie_Bluel_Architecte_JWT");
    console.log("Token retrieved:", token);

    const editModeBanner = document.querySelector(".banner_edit_mode");
    const otherSections = document.querySelector('.other-sections');
    const filterSection = document.querySelector('.filter-buttons');
    const loginLogoutLink = document.getElementById('loginLogoutLink');

    if (token) {
        // Admin session is active
        editModeBanner.style.display = 'block';
        otherSections.style.display = 'block';
        filterSection.style.visibility = 'hidden';
        loginLogoutLink.textContent = 'Logout';
        loginLogoutLink.href = '#'; // Update the link to do something for logout
        loginLogoutLink.addEventListener('click', performLogout);
        console.log("Admin panel displayed, other sections shown, filter buttons made invisible, login link changed to logout");
    } else {
        // No valid admin session
        editModeBanner.style.display = 'none';
        otherSections.style.display = 'none';
        filterSection.style.visibility = 'visible';
        loginLogoutLink.textContent = 'Login';
        loginLogoutLink.href = '/pages/login.html'; // Revert the href if it was changed
        loginLogoutLink.removeEventListener('click', performLogout);
        console.log("Admin panel hidden, other sections hidden, filter buttons visible, login link reverted to login");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showAdminPanel();  // Call this function to check token and update the UI
    updateLoginLogoutLink(); // Ensure the login/logout link is correctly displayed on page load
});
function updateLoginLogoutLink() {
    const loginLogoutLink = document.querySelector('a[href="/pages/login.html"]');
    const token = localStorage.getItem('Sophie_Bluel_Architecte_JWT');
  
    if (token) {
      loginLogoutLink.textContent = 'Logout';
      loginLogoutLink.href = '#';
      loginLogoutLink.addEventListener('click', performLogout);
    } else {
      loginLogoutLink.textContent = 'Login';
      loginLogoutLink.href = '/pages/login.html';
      loginLogoutLink.removeEventListener('click', performLogout);
    }
  }
  
  function performLogout(event) {
    event.preventDefault();
    localStorage.removeItem('Sophie_Bluel_Architecte_JWT');
    window.location.href = "/pages/login.html";
    updateLoginLogoutLink();
    showAdminPanel(); // Update admin panel visibility on logout
  }
  
  function setupLogin() {
    const btnLogin = document.querySelector(".login-button");
    btnLogin.addEventListener("click", function(event) {
      event.preventDefault();
      const email = document.querySelector("#user-email").value;
      const password = document.querySelector("#user-password").value;
      sendLoginRequest(email, password);
    });
  }
  
  function sendLoginRequest(email, password) {
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.token) {
        localStorage.setItem("Sophie_Bluel_Architecte_JWT", data.token);
        window.location.href = "../index.html"; // Redirect to index.html on successful login
      } else {
        alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
      }
    });
  }
  
  function showAdminPanel() {
    const token = localStorage.getItem("Sophie_Bluel_Architecte_JWT");
    console.log("Token retrieved:", token);
  
    const editModeBanner = document.querySelector(".banner_edit_mode");
    const otherSections = document.querySelector('.other-sections');
    const filterSection = document.querySelector('.filter-buttons');
    const loginLink = document.querySelector('a[href="/pages/login.html"]'); // Keep this selection based on existing href
  
    if (token) {
      // Admin session is active
      editModeBanner.style.display = 'block';
      otherSections.style.display = 'block';
      filterSection.style.visibility = 'hidden';
      loginLink.textContent = 'Logout';
      loginLink.href = '#';
      loginLink.addEventListener('click', performLogout);
      console.log("Admin panel displayed, other sections shown, filter buttons made invisible, login link changed to logout");
    } else {
      // invalid admin session
      editModeBanner.style.display = 'none';
      otherSections.style.display = 'none';
      filterSection.style.visibility = 'visible';
      loginLink.textContent = 'Login';
      loginLink.href = '/pages/login.html'; 
      loginLink.removeEventListener('click', performLogout);
      console.log("Admin panel hidden, other sections hidden, filter buttons visible, login link reverted to login");
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    showAdminPanel(); 
    setupLogin(); 
  });
  