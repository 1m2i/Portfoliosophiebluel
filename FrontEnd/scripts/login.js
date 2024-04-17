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
    } else {
      alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
    }
  })
}

setupLogin();

