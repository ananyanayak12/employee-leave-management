async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    document.getElementById("loginResult").innerText =
      data.message || JSON.stringify(data);
  } catch (err) {
    document.getElementById("loginResult").innerText = "Error logging in";
  }
}

async function applyLeave() {
  const reason = document.getElementById("reason").value;
  const days = document.getElementById("days").value;

  try {
    const res = await fetch("/api/leave/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason, days }),
    });

    const data = await res.json();
    document.getElementById("leaveResult").innerText =
      data.message || JSON.stringify(data);
  } catch (err) {
    document.getElementById("leaveResult").innerText = "Error applying leave";
  }
}
