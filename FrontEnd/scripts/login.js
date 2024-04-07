const login = () => {
  const btnLogin = document.querySelector(".login-button"); // Updated to use class selector

  btnLogin.addEventListener("click", async (e) => {
    const inputEmail = document.querySelector("#user-email");
    const inputPassword = document.querySelector("#user-password");
    const emailError = document.querySelector(".email-error"); // Specific error for email
    const passwordError = document.querySelector(".password-error"); // Specific error for password

    // Clear any existing error messages
    emailError.textContent = '';
    passwordError.textContent = '';

    // Prevent the default form submission
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
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }
      return res.json();
    })
    .then((res_json) => {
      if (res_json.token) {
        // Store the JWT token in sessionStorage
        sessionStorage.setItem("Sophie_Bluel_Interior_Design_JWT", res_json.token);
        // Redirect to the home page
        window.location.href = "../index.html";
      } else {
        // If there is no token, display an error message
        passwordError.textContent = "Identifiant ou mot de passe incorrect.";
      }
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch
      console.error('Error:', error);
      emailError.textContent = "Problème de connexion au service. Veuillez réessayer plus tard.";
    });
  });
};

login();

// Assume this token checking happens elsewhere or after page load
const checkTokenAndRedirect = () => {
  const token = sessionStorage.getItem("Sophie_Bluel_Interior_Design_JWT");
  if (token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      console.log("User ID:", payload.userId);
      // Adjust your application state as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle token parsing error, maybe clear the token and redirect to login
    }
  }
};

// Run the token check
checkTokenAndRedirect();
