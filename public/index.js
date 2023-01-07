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
};

registerEmail.addEventListener("keyup", function () {
  this.setCustomValidity("");
});
// const mainPage = async () => {
//   const token = Cookies.get("token");
//   console.log(token);
//   try {
//     axios.get("/main", {
//       withCredentials: true,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// mainPage();
//signup button
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
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
      const { user } = response.data;
      const token = user.token;
      const username = user.name;
      localStorage.setItem("token", token);
      registerName.value = "";
      registerEmail.value = "";
      registerPassword.value = "";
      registerPasswordConfirm.value = "";

      window.location.replace("./main.html");
      signUpForm.removeEventListener("submit");
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
  } else {
    signUpForm.reportValidity();
  }
});

//login button
signInform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;
  try {
    const { data } = await axios.post("/api/v1/auth0/login", {
      email,
      password,
    });
    if (data.msg === "A user with this email already exists") {
      console.log();
    }
    loginEmail.value = "";
    LoginPassword.value = "";
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.msg);
    }
  }
});
