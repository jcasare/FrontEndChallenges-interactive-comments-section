const reviewForm = document.querySelector("#review-form");
const createInput = document.querySelector("#create-input");
const createRating = document.querySelector("#create-rating");

reviewForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const reviewText = createInput.value;
  const rating = createRating.value;
  try {
    const {
      data: { review },
    } = await createReview({ reviewText, rating });
    showReview(review);
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

function showReview(review) {}
