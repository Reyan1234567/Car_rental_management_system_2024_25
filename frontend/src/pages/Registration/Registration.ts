// frontend/src/pages/Registration/Registration.ts

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form") as HTMLFormElement;
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("confirm-password") as HTMLInputElement;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Simple validation for empty fields
        if (!name || !email || !password || !confirmPassword) {
            alert("All fields are required.");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Make an API call to register the user (mocked for now)
        try {
            // Assuming we have a register function in authService.ts
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Registration successful!");
                window.location.href = "/login"; // Redirect to login page
            } else {
                alert(data.message || "An error occurred during registration.");
            }
        } catch (error) {
            console.error("Error registering:", error);
            alert("An error occurred while processing your registration.");
        }
    });
});
