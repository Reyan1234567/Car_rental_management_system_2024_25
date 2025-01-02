import { login } from "../../services/authService";

const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const loginError = document.getElementById("loginError") as HTMLElement;

loginForm.addEventListener("submit", async (e: Event) => {
  e.preventDefault();

  const username = (document.getElementById("username") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  try {
    const token = await login(username, password);
    if (token) {
      localStorage.setItem("authToken", token);
      window.location.href = "../Dashboard/Dashboard.html"; // Redirect to the dashboard
    }
  } catch (error) {
    loginError.classList.remove("d-none");
    loginError.textContent = "Invalid username or password.";
  }
});
