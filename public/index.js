const userLoginPassword = document.querySelector(".userSigninPassword");
const userSignUpPassword = document.querySelector(".userSignupPassword");
const userSigninPasswordRepeat = document.querySelector(
  ".userSignupPasswordRepeat"
);
const loginBtn = document.querySelector(".loginBtn");
const signUpBtn = document.querySelector(".signUpBtn");

const toggleForm = () => {
  const container = document.querySelector(".container");
  container.classList.toggle("active");
};
