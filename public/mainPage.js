// const access_token = Cookies.get("token");
const reviewForm = document.querySelector("#review-form");
const createInput = document.querySelector("#create-input");
const createRating = document.querySelector("#create-rating");
const reviewContainer = document.querySelector("#reviews-container");
// let currentUser;
// const getCurrentUser = async () => {
//   try {
//     const { data } = await axios.get("/api/user");
//     currentUser = data.user;
//   } catch (error) {
//     console.log(error);
//   }
// };

reviewForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const reviewText = createInput.value;
  const rating = createRating.value;
  try {
    const {
      data: { review },
    } = await axios.post(
      "/api/v1/reviews",
      { reviewText, rating },
      { withCredentials: true }
    );
    console.log(review);
  } catch (error) {
    console.log(error);
  }
});

const getReviews = async () => {
  try {
    const {
      data: { reviews },
    } = await axios.get("/api/v1/reviews");
    for (let review of reviews) {
      showReview(review);
    }
  } catch (error) {
    console.log(error);
  }
};
// getReviews();

function showReview(review) {
  const reviewElement = document.createElement("div");
  reviewElement.classList.add("review");

  const authorElement = document.createElement("p");
  authorElement.classList.add("review-author");
  authorElement.textContent = review.author;

  const reviewTextElement = document.createElement("p");
  reviewTextElement.classList.add("review-text");
  reviewElement.textContent = review.reviewText;
  reviewElement.appendChild(authorElement);
  reviewElement.appendChild(reviewTextElement);
  reviewContainer.appendChild(reviewElement);
}
