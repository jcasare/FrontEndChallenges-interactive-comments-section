const loginUsername = document.querySelector(".username-input");
const LoginPassword = document.querySelector(".password-login-input");
const registerName = document.querySelector(".userName-input-signUp");
const registerEmail = document.querySelector(".userEmail-input-signUp");
const registerPassword = document.querySelector(".userSignupPassword");
const registerPasswordConfirm = document.querySelector(
  ".userSignupPasswordRepeat"
);
const loginBtn = document.querySelector("#loginBtn");
const signUpBtn = document.querySelector("#signUpBtn");
const signUpForm = document.querySelector("#signUpForm");
const signInform = document.querySelector("#signInForm");

const toggleForm = () => {
  const container = document.querySelector(".container");
  container.classList.toggle("active");
};

const validatePassword = () => {
  if (registerPassword.value != registerPasswordConfirm.value) {
    registerPasswordConfirm.setCustomValidity("Passwords Don't Match");
  } else {
    registerPasswordConfirm.setCustomValidity("");
  }
};

//signup button
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  validatePassword();
  registerPassword.onchange = validatePassword;
  registerPasswordConfirm.onkeyup = validatePassword;
  const name = registerName.value;
  const email = registerEmail.value;
  const password = registerPassword.value;

  try {
    const { data } = await axios.post("/api/v1/auth0/register", {
      name,
      email,
      password,
    });

    registerName.value = "";
    registerEmail.value = "";
    registerPassword.value = "";
    registerPasswordConfirm.value = "";
  } catch (error) {
    if (
      error.response &&
      error.response.data.msg === "A user with this email already exists"
    ) {
      window.location.replace("/");
      setTimeout(toggleForm(), 2000);
    }
  }
});

//login button
loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const username = loginUsername.value;
  const password = LoginPassword.value;
  try {
    const { data } = await axios.post("/api/v1/auth0/login", {
      username,
      password,
    });
    if (data.msg === "A user with this email already exists") {
      console.log();
    }
    loginUsername.value = "";
    LoginPassword.value = "";
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.msg);
    }
  }
});
