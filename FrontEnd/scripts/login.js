function updateLoginLogoutLink() {
  const loginLogoutLink = document.getElementById('loginLogoutLink');
  if (sessionStorage.getItem('Sophie_Bluel_Architecte_JWT')) {
    loginLogoutLink.textContent = 'Logout';
    loginLogoutLink.href = '#'; // Update the link to do something for logout, maybe call a logout function
    loginLogoutLink.addEventListener('click', performLogout);
  } else {
    loginLogoutLink.textContent = 'Login';
    loginLogoutLink.href = '/pages/login.html';
    loginLogoutLink.removeEventListener('click', performLogout);
  }
}

function performLogout(event) {
  event.preventDefault();
  sessionStorage.removeItem('Sophie_Bluel_Architecte_JWT');
  window.location.href = "../index.html"; // Redirect to home on logout or a specific logout page
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
      sessionStorage.setItem("Sophie_Bluel_Architecte_JWT", JSON.stringify(data));
      window.location.href = "../index.html"; // Redirect to index.html on successful login
      updateLoginLogoutLink(); // Update link on successful login
    } else {
      alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
    }
  });
}

setupLogin();

