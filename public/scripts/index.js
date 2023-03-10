const loginEmail = document.querySelector(".email-input");
const loginPassword = document.querySelector(".password-login-input");
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
  registerEmail.addEventListener("keyup", async function () {
    this.setCustomValidity("");
  });
};
const loginValidity = () => {
  loginEmail.setCustomValidity("");
  loginEmail.reportValidity();
  loginPassword.setCustomValidity("");
  loginPassword.reportValidity();
};

const signUpRequest = async (e) => {
  e.preventDefault();
  const signUpForm = e.target;
  validatePassword();
  registerPassword.onchange = validatePassword;
  registerPasswordConfirm.onkeyup = validatePassword;
  registerEmail.setCustomValidity("");
  const name = registerName.value;
  const email = registerEmail.value;
  const password = registerPassword.value;
  if (signUpForm.checkValidity()) {
    try {
      const response = await axios.post(
        "/api/v1/auth0/register",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      registerName.value = "";
      registerEmail.value = "";
      registerPassword.value = "";
      registerPasswordConfirm.value = "";
      if (response.status === 201 && response.data.status === "success") {
        alert(
          "SignUp Successful, Kindly login with your newly created account"
        );
        toggleForm();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.msg === "A user with this email already exists"
      ) {
        toggleForm();
        window.location.replace("/#signUpForm");
        toggleForm();
        registerEmail.setCustomValidity(
          "A user with this email already exists"
        );
        registerEmail.reportValidity();
        localStorage.removeItem("token");
      }
    }
  } else if (
    error.response &&
    error.response.data.msg === "Not authorized for this route"
  ) {
    window.location.href = "/";
  } else if (
    error.response &&
    error.response.data.msg === "Kindly fill out all fields"
  ) {
    registerEmail.setCustomValidity("Kindly fill out all fields");
    signUpForm.reportValidity();
  } else {
    console.log(error.response);
  }
};

const loginRequest = async (e) => {
  e.preventDefault();
  const signInform = e.target;
  loginEmail.setCustomValidity("");
  loginPassword.setCustomValidity("");
  const email = loginEmail.value;
  const password = loginPassword.value;
  if (signInform.checkValidity()) {
    try {
      const response = await axios.post(
        "/api/v1/auth0/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      loginEmail.value = "";
      loginPassword.value = "";
      window.location.href = "/dashboard";
    } catch (error) {
      if (error.response && error.response.data.msg === "Invalid Credentials") {
        loginPassword.setCustomValidity("Invalid email or password");
        signInform.reportValidity();
        loginEmail.value = "";
        loginEmail.onchange = loginValidity;
        loginPassword.onchange = loginValidity;
      } else if (
        error.response &&
        error.response.data.msg === "Please provide email and password"
      ) {
        loginEmail.setCustomValidity("Please provide email and password");
        loginPassword.setCustomValidity("Please provide email and password");
        signInform.reportValidity;
      } else {
        console.log(error.response);
      }
    }
  }
};

signUpForm.addEventListener("submit", signUpRequest);

// //login button

signInform.addEventListener("submit", loginRequest);
