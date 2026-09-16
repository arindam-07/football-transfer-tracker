const loginForm = document.getElementById("loginForm");

const loginMessage = document.getElementById("loginMessage");




loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(
            "https://football-transfer-tracker.onrender.com/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem(
                "adminToken",
                data.token
            );

            loginMessage.textContent =
                "Login successful!";

            window.location.href = "admin.html";

        } else {

            loginMessage.textContent =
                data.message || "Login failed.";

        }

    } catch (error) {

        console.error("Login error:", error);

        loginMessage.textContent =
            "Server connection failed.";
    }
});