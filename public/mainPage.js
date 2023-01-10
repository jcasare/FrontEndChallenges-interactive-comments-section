const createForm = document.querySelector("#create-form");
const createInput = document.querySelector("#create-input");

const sendReview = async (e) => {
  e.preventDefault();
  const createForm = e.target;
  const userReview = createInput.value;
  try {
    const { data } = await axios.post(
      "/api/v1/reviews",
      { userReview },
      { withCredentials: true }
    );
  } catch (error) {}
};
