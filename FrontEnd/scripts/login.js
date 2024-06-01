document.addEventListener('DOMContentLoaded', (event) => {
  setupLogin();
});

function performLogout(event) {
  event.preventDefault();
  localStorage.removeItem('Sophie_Bluel_Architecte_JWT');
  window.location.href = "../index.html"; 
  updateLoginLogoutLink();
}

function setupLogin() {
  const btnLogin = document.querySelector(".login-button");
  if (!btnLogin) {
    console.error('Element with class "login-button" not found');
    return;
  }
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
  })
  .catch(function(error) {
    console.error('Error during login request:', error);
  });
}
