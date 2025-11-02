function showTab(tab) {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("registerSection").classList.add("hidden");
  document.getElementById("loginTab").classList.remove("active");
  document.getElementById("registerTab").classList.remove("active");

  document.getElementById(tab + "Section").classList.remove("hidden");
  document.getElementById(tab + "Tab").classList.add("active");
}

async function register() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    document.getElementById("registerResult").innerText = data.message || JSON.stringify(data);
  } catch (err) {
    document.getElementById("registerResult").innerText = "Error registering user";
  }
}

async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      document.getElementById("loginResult").innerText = "Login successful!";
      document.getElementById("loginSection").classList.add("hidden");
      document.getElementById("registerSection").classList.add("hidden");
      document.querySelector(".tabs").classList.add("hidden");
      document.getElementById("leaveSection").classList.remove("hidden");
    } else {
      document.getElementById("loginResult").innerText = data.message || "Invalid credentials";
    }
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
