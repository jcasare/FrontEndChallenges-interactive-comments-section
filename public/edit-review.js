const reviewIDDOM = document.querySelector(".review-edit-id");
const reviewTextDOM = document.querySelector(".review-text");
const ratingSelected = document.querySelector(".review-select");
const editForm = document.querySelector(".single-review-form");
const formAlertDOM = document.querySelector(".form-alert");
const editBtn = document.querySelector(".review-edit-btn");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");

const showReview = async () => {
  try {
    const {
      data: { review, username },
    } = await axios.get(`/api/v1/reviews/${id}`);
    const {
      _id: reviewID,
      rating,
      reviewText,
      author: { _id: authorID, name: authorName },
      userID,
    } = review;
    reviewIDDOM.textContent = reviewID;
    reviewTextDOM.value = reviewText;
  } catch (error) {
    console.log(error);
  }
};

showReview();
editForm.addEventListener("submit", async (e) => {
  editBtn.textContent = "Loading...";
  e.preventDefault();
  try {
    const reviewText = reviewTextDOM.value;
    const rating = ratingSelected.value;
    const {
      data: { review },
    } = await axios.patch(`/api/v1/reviews/${id}`, { reviewText, rating });
  } catch (error) {}
});
