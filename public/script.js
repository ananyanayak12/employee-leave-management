function showTab(tab) {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("registerSection").classList.add("hidden");
  document.getElementById("loginTab").classList.remove("active");
  document.getElementById("registerTab").classList.remove("active");

  document.getElementById(tab + "Section").classList.remove("hidden");
  document.getElementById(tab + "Tab").classList.add("active");
}

// ====================== REGISTER ======================
async function register() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (!name || !email || !password) {
    document.getElementById("registerResult").innerText = "Please fill all fields.";
    return;
  }

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    document.getElementById("registerResult").innerText =
      "✅ Registration successful! Please login.";
    document.getElementById("registerName").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
    showTab("login");
  } else {
    document.getElementById("registerResult").innerText =
      data.message || "Registration failed.";
  }
}

// ====================== LOGIN ======================
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok && data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("name", data.name);

    document.getElementById("authContainer").classList.add("hidden");

    if (data.role === "admin") {
      document.getElementById("adminSection").classList.remove("hidden");
      loadAllLeaves();
    } else {
      document.getElementById("mainContainer").classList.remove("hidden");
      document.getElementById("userName").innerText = data.name || "Employee";
      loadMyLeaves();
    }
  } else {
    document.getElementById("loginResult").innerText =
      data.message || "Invalid credentials";
  }
}

// ====================== APPLY LEAVE ======================
async function applyLeave() {
  const reason = document.getElementById("reason").value;
  const days = document.getElementById("days").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const token = localStorage.getItem("token");

  if (!token) {
    document.getElementById("leaveResult").innerText =
      "Not authorized, please login first.";
    return;
  }

  const res = await fetch("/api/leave/apply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reason, days, startDate, endDate }),
  });

  const data = await res.json();
  document.getElementById("leaveResult").innerText =
    data.message || "✅ Leave applied!";
  loadMyLeaves();
}

// ====================== VIEW MY LEAVES ======================
async function loadMyLeaves() {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/leave/my-leaves", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const leaves = await res.json();
  const myLeavesList = document.getElementById("myLeavesList") || document.getElementById("leaveResult");

  if (Array.isArray(leaves) && leaves.length > 0) {
    myLeavesList.innerHTML =
      "<h4>🗂️ My Leave Requests:</h4>" +
      leaves
        .map(
          (l) => `
          <div class="leave-item">
            📅 <b>${l.startDate?.slice(0, 10)}</b> to <b>${l.endDate?.slice(0, 10)}</b><br>
            Reason: ${l.reason}<br>
            Status: <b style="color:${l.status === "Approved"
              ? "green"
              : l.status === "Rejected"
              ? "red"
              : "orange"
            };">${l.status}</b>
          </div>
        `
        )
        .join("");
  } else {
    myLeavesList.innerHTML = "<p>No leave requests yet.</p>";
  }
}

// ====================== ADMIN: VIEW ALL LEAVES ======================
async function loadAllLeaves() {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/leave/all", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const leaves = await res.json();
  const list = document.getElementById("leaveList");

  if (!res.ok) {
    list.innerHTML = `<p>Error loading leaves</p>`;
    return;
  }

  list.innerHTML = leaves
    .map(
      (l) => `
      <div class="leave-card">
        <p><b>${l.employee?.name}</b> (${l.employee?.email})</p>
        <p>📅 ${l.startDate?.slice(0,10)} to ${l.endDate?.slice(0,10)}</p>
        <p>${l.reason}</p>
        <p>Status: <b>${l.status}</b></p>
        ${
          l.status === "Pending"
            ? `
          <button onclick="updateStatus('${l._id}', 'Approved')">✅ Approve</button>
          <button onclick="updateStatus('${l._id}', 'Rejected')">❌ Reject</button>
          `
            : `<p>✅ Action Completed</p>`
        }
      </div>
    `
    )
    .join("");
}

// ====================== ADMIN: UPDATE STATUS ======================
async function updateStatus(id, status) {
  const token = localStorage.getItem("token");

  await fetch(`/api/leave/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  loadAllLeaves();
}

// ====================== LOGOUT ======================
function logout() {
  localStorage.clear();
  location.reload();
}
