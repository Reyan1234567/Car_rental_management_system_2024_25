document.addEventListener("DOMContentLoaded", () => {
    // Get references to buttons
    const loginBtn = document.getElementById("login-button");
    const registerBtn = document.getElementById("register-button");
  
    // Ensure the buttons exist before adding event listeners
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        window.location.href = "/login"; // Navigate to login page
      });
    } else {
      console.error("Login button not found!");
    }
  
    if (registerBtn) {
      registerBtn.addEventListener("click", () => {
        window.location.href = "/register"; // Navigate to register page
      });
    } else {
      console.error("Register button not found!");
    }
  });
  
