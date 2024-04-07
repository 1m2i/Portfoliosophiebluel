const login = () => {
  // Retrieve the login button by its updated ID
  const btnLogin = document.querySelector("#login-button");

  btnLogin.addEventListener("click", async (e) => {
    const inputEmail = document.querySelector("#user-email");
    const inputPassword = document.querySelector("#user-password");
    const signInErrorMessage = document.querySelector(".signin_error_msg");

    // Prevent the form from submitting traditionally, which would reload the page
    e.preventDefault();

    // Request a token from the API
    await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputEmail.value,
        password: inputPassword.value,
      }),
    })
    .then((res) => res.json())
    .then((res_json) => {
      if (res_json.token) {
        // Store the JWT token in sessionStorage
        sessionStorage.setItem("Sophie_Bluel_Interior_Design_JWT", res_json.token);
        // Redirect to the home page
        window.location.href = "../index.html";
      } else {
        // If there is no token, display an error message
        signInErrorMessage.innerHTML = "Identifiant ou mot de passe incorrect.";
      }
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch
      console.error('Error:', error);
      signInErrorMessage.innerHTML = "Problème de connexion au service. Veuillez réessayer plus tard.";
    });
  });
};

login();

const token = sessionStorage.getItem("Sophie_Bluel_Interior_Design_JWT");
if (token) {
  // Sépare le token en ses différentes parties
  const base64Url = token.split('.')[1];
  // Remplace les caractères spéciaux et décode le base64
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  // Parse le payload du token pour le convertir de JSON en objet JavaScript
  const payload = JSON.parse(window.atob(base64));

  // Maintenant, vous avez accès à l'userId et autres informations stockées
  console.log("User ID:", payload.userId);
  // Ici, vous pouvez ajuster l'état connecté de votre application selon l'userId ou d'autres données
}
