function updateLoginLogoutLink() {
  const loginLogoutLink = document.getElementById('loginLogoutLink');
  if (localStorage.getItem('Sophie_Bluel_Architecte_JWT')) {
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
  window.location.href = "../index.html"; 
  updateLoginLogoutLink();
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
      window.location.href = "../index.html"; 
      updateLoginLogoutLink(); 
    } else {
      alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
    }
  });
}

// Call setup functions
setupLogin();
updateLoginLogoutLink();

