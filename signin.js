
let isSignup = false;
let form = document.getElementById("authForm");
let nameField = document.getElementById("nameField");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let title = document.getElementById("title");
let subtitle = document.getElementById("subtitle");
let submitBtn = document.getElementById("submitBtn");
let switchBtn = document.getElementById("switchBtn");
let switchText = document.getElementById("switchText");
let error = document.getElementById("error");
let notice = document.getElementById("notice");
switchBtn.addEventListener("click", function() {
    isSignup = !isSignup;
    error.innerText = "";
    notice.innerText = "";
    if (isSignup) {
        title.innerText = "Create your account";
        subtitle.innerText = "Enter your details to sign up.";
        nameField.style.display = "block";
        submitBtn.innerText = "Sign up";
        switchText.innerText = "Already have an account?";
        switchBtn.innerText = "Sign in";
    }
    else {
        title.innerText = "Sign in to Twitter";
        subtitle.innerText = "Welcome back. Enter your details below.";
        nameField.style.display = "none";
        submitBtn.innerText = "Sign in";
        switchText.innerText = "Don't have an account?";
        switchBtn.innerText = "Sign up";
    }
});
form.addEventListener("submit", function(e) {
    e.preventDefault();
    error.innerText = "";
    notice.innerText = "";
    let name = nameInput.value.trim();
    let email = emailInput.value.trim().toLowerCase();
    let password = passwordInput.value;
    if (isSignup) {

        if (name === "" || email === "" || password === "") {
            error.innerText = "Please fill all fields.";
            return;
        }
        if (password.length < 6) {
            error.innerText = "Password must contain at least 6 characters.";
            return;
        }
        let existingUser = JSON.parse(localStorage.getItem("user"));

        if (existingUser && existingUser.email === email) {
            error.innerText = "This email is already registered.";
            return;
        }
        let user = {
            name: name,
            email: email,
            password: password
        };
        localStorage.setItem("user", JSON.stringify(user));
        notice.innerText = "Account created successfully. Please sign in.";
        isSignup = false;
        title.innerText = "Sign in to Twitter";
        subtitle.innerText = "Welcome back. Enter your details below.";
        nameField.style.display = "none";
        submitBtn.innerText = "Sign in";
        switchText.innerText = "Don't have an account?";
        switchBtn.innerText = "Sign up";
        nameInput.value = "";
        passwordInput.value = "";
    }
    else {
        let savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            error.innerText = "Please create an account first.";
            return;
        }

        if (email === savedUser.email &&
            password === savedUser.password) {

            localStorage.setItem("loggedIn", "true");

            window.location.href = "profile.html";

        }
        else {
            error.innerText = "Invalid email or password.";
        }
    }
});
