const API_URL = "http://localhost:3000/api/auth";

export async function login(username: string, password: string): Promise<string> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data.token; // Assuming the response includes a JWT token
}
