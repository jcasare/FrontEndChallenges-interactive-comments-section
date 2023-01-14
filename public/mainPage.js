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
const getTimeAgo = (createdAt) => {
  const currentTime = new Date();
  //difference in milli-secs
  const diff = currentTime - new Date(createdAt);
  //difference in seconds
  const diffInSeconds = diff / 1000;
  //difference in minutes
  const diffInMinutes = diffInSeconds / 60;
  //difference in days
  const diffInDays = diffInMinutes / 60 / 24;

  if (diffInSeconds < 60) {
    return Math.floor(diffInSeconds) + " seconds ago";
  } else if (diffInMinutes < 60) {
    return Math.floor(diffInMinutes) + " minutes ago";
  } else if (diffInDays < 1) {
    return Math.floor(diffInMinutes / 60) + " hours ago";
  } else {
    return Math.floor(diffInDays) + " days ago";
  }
};

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
    createInput.value = "";
    createRating.value = "1";
    if (review) {
      addNewReview(review[0]);
    }
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
    console.log(reviews);
  } catch (error) {
    console.log(error);
  }
};
document.addEventListener("load", getReviews());
function showReview(review) {
  const reviewElement = document.createElement("div");
  reviewElement.classList.add("review");

  const authorElement = document.createElement("p");
  authorElement.classList.add("review-author");
  authorElement.textContent = review.author.name;
  const reviewTimeElement = document.createElement("p");
  reviewTimeElement.classList.add("review-time");
  reviewTimeElement.textContent = getTimeAgo(review.createdAt);

  const reviewTextElement = document.createElement("p");
  reviewTextElement.classList.add("review-text");
  reviewElement.textContent = review.reviewText;
  reviewElement.appendChild(authorElement);
  reviewElement.appendChild(reviewTextElement);
  reviewElement.appendChild(reviewTimeElement);
  reviewContainer.appendChild(reviewElement);
}
function addNewReview(review) {
  const newReviewElement = document.createElement("div");
  newReviewElement.innerHTML = `<p class = 'review-text'>${
    review.reviewText
  }</p>
        <p class = 'review-author'>${review.author.name}</p>
        <p class = 'review-time'>${getTimeAgo(review.createdAt)}</p>`;
  reviewContainer.appendChild(newReviewElement);
}
