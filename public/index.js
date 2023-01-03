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
  e.preventDefault;
  validatePassword();
  registerPassword.onchange = validatePassword;
  registerPasswordConfirm.onkeyup = validatePassword;
});
