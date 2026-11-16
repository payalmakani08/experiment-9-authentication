const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const message = document.getElementById("message");

// Show Login
function showLogin() {
    loginForm.classList.remove("d-none");
    registerForm.classList.add("d-none");
    message.innerText = "";
}

// Show Register
function showRegister() {
    registerForm.classList.remove("d-none");
    loginForm.classList.add("d-none");
    message.innerText = "";
}

// Register User
registerForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const res = await fetch("/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    const result = await res.json();

    message.innerText = result.message;

    if (res.ok) {
        registerForm.reset();
        showLogin();
        message.innerText = result.message;
    }
});

// Login User
loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    };

    const res = await fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    const result = await res.json();

    message.innerText = result.message;

    if (res.ok) {
        loginForm.reset();
        loadDashboard();
    }
});

// Load Dashboard
async function loadDashboard() {
    const res = await fetch("/dashboard");

    if (res.ok) {
        const user = await res.json();

        document.getElementById("forms").classList.add("d-none");
        document.getElementById("dashboard").classList.remove("d-none");

        document.getElementById("userName").innerText = user.name;
        document.getElementById("userEmail").innerText = user.email;

        message.innerText = "";
    }
}

// Logout
async function logout() {
    await fetch("/logout", {
        method: "POST"
    });

    document.getElementById("dashboard").classList.add("d-none");
    document.getElementById("forms").classList.remove("d-none");

    showLogin();
    message.innerText = "Logged out successfully!";
}

// Check login when page opens
loadDashboard();

