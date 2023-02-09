// const reviewIDDOM = document.querySelector(".review-edit-id");
// const reviewTextDOM = document.querySelector(".review-text");
// const ratingSelected = document.querySelector(".rating-select");
// const editForm = document.querySelector(".single-review-form");
// const formAlertDOM = document.querySelector(".form-alert");
// const editBtn = document.querySelector(".review-edit-btn");
// const params = window.location.search;
// let tempReview;
// const id = new URLSearchParams(params).get("id");
// const showReview = async () => {
//   try {
//     const {
//       data: { review, username },
//     } = await axios.get(`/api/v1/reviews/${id}`);

//     const { _id: reviewID, rating, reviewText } = review[0];
//     reviewIDDOM.textContent = reviewID;
//     reviewTextDOM.value = reviewText;
//     ratingSelected.value = rating;
//   } catch (error) {
//     formAlertDOM.style.display = "block";
//     formAlertDOM.innerHTML = "Error, please try Again";
//     console.log(error);
//   }
// };

// showReview();
// editForm.addEventListener("submit", async (e) => {
//   editBtn.textContent = "Loading...";
//   e.preventDefault();
//   try {
//     const reviewText = reviewTextDOM.value;
//     const rating = ratingSelected.value;
//     const {
//       data: { review },
//     } = await axios.patch(
//       `/api/v1/reviews/${id}`,
//       { reviewText, rating },
//       { withCredentials: true }
//     );
//     console.log(review);
//     const {
//       _id: reviewID,
//       reviewText: updatedReview,
//       rating: updatedRating,
//     } = review;
//     reviewIDDOM.textContent = reviewID;
//     reviewTextDOM.textContent = updatedReview;
//     ratingSelected.value = updatedRating;
//     editBtn.textContent = "Success!!";
//   } catch (error) {
//     console.log(error);
//     reviewTextDOM.value = tempReview;
//     formAlertDOM.innerHTML = "Error, Please try again";
//   }
//   setTimeout(() => {
//     formAlertDOM.style.display = "none";
//   }, 3000);
// });
