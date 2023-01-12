// const access_token = Cookies.get("token");
const reviewForm = document.querySelector("#review-form");
const createInput = document.querySelector("#create-input");
const createRating = document.querySelector("#create-rating");
const reviewContainer = document.querySelector("#reviews-container");
reviewForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const reviewText = createInput.value;
  const rating = createRating.value;
  try {
    const {
      data: { reviews },
    } = await axios.post(
      "/api/v1/reviews",
      { reviewText, rating },
      { withCredentials: true }
    );
    console.log(reviews);
  } catch (error) {
    console.log(error);
  }
});

const createReview = async (review) => {
  try {
    const { data } = await axios.post("/api/v1/reviews", review, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getReviews = async () => {
  try {
    const { data } = await axios.get("/api/v1/reviews");
    return data;
  } catch (error) {
    console.log(error);
  }
};
getReviews();

function showReview(review) {
  const reviewElement = document.createElement("div");
  reviewElement.classList.add("review");

  const authorElement = document.createElement("p");
  authorElement.classList.add("review-author");
  // authorElement.textContent=review.
}
