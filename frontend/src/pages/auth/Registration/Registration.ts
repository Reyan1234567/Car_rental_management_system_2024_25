const registrationForm = document.querySelector('form') as HTMLFormElement;

registrationForm.addEventListener('submit', async (event: Event) => {
  event.preventDefault(); 

  const fullNameInput = document.querySelector('#fullName') as HTMLInputElement;
  const roleInput = document.querySelector('#role') as HTMLInputElement;
  const usernameInput = document.querySelector('#username') as HTMLInputElement;
  const passwordInput = document.querySelector('#password') as HTMLInputElement;
  const confirmPasswordInput = document.querySelector('#confirmPassword') as HTMLInputElement;

  const fullName = fullNameInput.value.trim();
  const role = roleInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (!fullName || !role || !username || !password || !confirmPassword) {
    alert('All fields are required.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3333/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password, role}),
    });

    if (response.ok||response.status===201) {
      alert('Registration successful! You can now log in.');
      window.location.href = '../Login/Login.html'; 
    } else {
      const error = await response.json();
      alert(`Registration failed: ${error.message}`);
    }
  } catch (err) {
    console.error('Error during registration:', err);
    alert('An error occurred while trying to register. Please try again.');
  }
});
