
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const dashboard = document.getElementById("dashboard");
const message = document.getElementById("message");

// Show login form
document.getElementById("loginTab").addEventListener("click", function () {
    loginForm.classList.remove("d-none");
    registerForm.classList.add("d-none");
    dashboard.classList.add("d-none");
    message.textContent = "";
});

// Show registration form
document.getElementById("registerTab").addEventListener("click", function () {
    registerForm.classList.remove("d-none");
    loginForm.classList.add("d-none");
    dashboard.classList.add("d-none");
    message.textContent = "";
});

// Register new user
registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            message.textContent = "Registration successful! Please login.";
            message.style.color = "green";

            registerForm.reset();
            registerForm.classList.add("d-none");
            loginForm.classList.remove("d-none");
        } else {
            message.textContent = data.message || "Registration failed.";
            message.style.color = "red";
        }

    } catch (error) {
        message.textContent = "Something went wrong. Try again.";
        message.style.color = "red";
    }
});

// Login user
loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            message.textContent = "Login successful!";
            message.style.color = "green";
            loginForm.reset();
            await loadDashboard();
        } else {
            message.textContent = data.message || "Invalid email or password.";
            message.style.color = "red";
        }

    } catch (error) {
        message.textContent = "Something went wrong. Try again.";
        message.style.color = "red";
    }
});

// Load dashboard
async function loadDashboard() {
    try {
        const response = await fetch("/dashboard", {
            credentials: "include"
        });

        const data = await response.json();

        if (response.ok) {
            loginForm.classList.add("d-none");
            registerForm.classList.add("d-none");
            dashboard.classList.remove("d-none");

            document.getElementById("userName").textContent =
                "Name: " + data.user.name;

            document.getElementById("userEmail").textContent =
                "Email: " + data.user.email;
        } else {
            message.textContent = data.message || "Please login again.";
            message.style.color = "red";
        }

    } catch (error) {
        message.textContent = "Unable to load dashboard.";
        message.style.color = "red";
    }
}

// Logout user
document.getElementById("logoutButton").addEventListener("click", async function () {
    try {
        const response = await fetch("/logout", {
            method: "POST",
            credentials: "include"
        });

        if (response.ok) {
            dashboard.classList.add("d-none");
            loginForm.classList.remove("d-none");
            registerForm.classList.add("d-none");

            message.textContent = "You have logged out successfully.";
            message.style.color = "green";
        } else {
            message.textContent = "Logout failed. Please try again.";
            message.style.color = "red";
        }

    } catch (error) {
        message.textContent = "Something went wrong.";
        message.style.color = "red";
    }
});
