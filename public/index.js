const loginEmail = document.querySelector(".username-input");
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

// const getMainPage = async (token) => {
//   try {
//     console.log(token);
//     const response = await axios.get("/main", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(response.data);
//     window.location.href = "/main";
//   } catch (error) {
//     console.error(error);
//   }
// };

async function signUpRequest(e) {
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

      // const { user } = response.data;
      // const token = user.token;
      // const username = user.name;
      // localStorage.setItem("token", token);

      // window.location.href = "/main";
      // signUpForm.removeEventListener("submit", handleLogin);
      registerName.value = "";
      registerEmail.value = "";
      registerPassword.value = "";
      registerPasswordConfirm.value = "";
      window.location.href = "/main";
    } catch (error) {
      if (
        error.response &&
        error.response.data.msg === "A user with this email already exists"
      ) {
        // toggleForm();
        // window.location.replace("/#signUpForm");
        // toggleForm();
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
  } else {
    signUpForm.reportValidity();
  }
}

signUpForm.addEventListener("submit", signUpRequest);

// //login button
// signInform.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const email = loginEmail.value;
//   const password = loginPassword.value;
//   try {
//     const { data } = await axios.post("/api/v1/auth0/login", {
//       email,
//       password,
//     });
//     if (data.msg === "A user with this email already exists") {
//       console.log();
//     }
//     loginEmail.value = "";
//     LoginPassword.value = "";
//   } catch (error) {
//     if (error.response) {
//       console.log(error.response.data.msg);
//     }
//   }
// });
