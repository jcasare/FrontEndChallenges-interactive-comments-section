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
  loginUsername.value = "";
  LoginPassword.value = "";
  registerEmail.value = "";
  registerPassword.value = "";
  registerPasswordConfirm.value = "";
};

const validatePassword = () => {
  if (registerPassword.value != registerPasswordConfirm.value) {
    registerPasswordConfirm.setCustomValidity("Passwords Don't Match");
  } else {
    registerPasswordConfirm.setCustomValidity("");
  }
};
signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  validatePassword();
  registerPassword.onchange = validatePassword;
  registerPasswordConfirm.onkeyup = validatePassword;
});
loginBtn.addEventListener("click", async (e) => {
  try {
    const { data } = await axios.post("/api/v1/auth/login", {
      username: loginUsername.value,
      password: LoginPassword.value,
    });
  } catch (error) {
    console.log(error.response);
  }
  loginUsername.value = "";
  LoginPassword.value = "";
});
