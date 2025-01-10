const loginForm = document.querySelector('form') as HTMLFormElement;

loginForm.addEventListener('submit', async (event: Event) => {
  event.preventDefault();

  const usernameInput = document.querySelector('#username') as HTMLInputElement;
  const passwordInput = document.querySelector('#password') as HTMLInputElement;
  const roleInput = document.querySelector('#role') as HTMLInputElement;

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const role = roleInput.value.trim();


  if (!username || !password||!role) {
    alert('Please enter all input fields.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3333/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role}),
    });

    if (response.ok||response.status===201) {
      const data = await response.json();

      localStorage.setItem('token', data.token);

      window.location.href = '/Dashboard.html';
    } else {
      const error = await response.json();
      alert(`Login failed: ${error.message}`);
    }
  } catch (err) {
    console.error('Error during login:', err);
    alert('An error occurred while trying to log in. Please try again.');
  }
});