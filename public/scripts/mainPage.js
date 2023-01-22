const reviewForm = document.querySelector("#review-form");
const createInput = document.querySelector("#create-input");
const createRating = document.querySelector("#create-rating");
const reviewContainer = document.querySelector("#reviews-container");
const loadingAlert = document.querySelector(".loading-text");
const reviewsDOM = document.querySelector(".reviews");
const decrement = document.querySelector("#decrement");
const increment = document.querySelector("#increment");
const usernameDOM = document.querySelector(".username");
// Load Reviews from /api/v1/reviews

const showReviews = async () => {
  reviewsDOM.innerHTML = "";
  loadingAlert.style.visiblity = "visible";
  try {
    const {
      data: { reviews, userID, username },
    } = await axios.get("/api/v1/reviews");
    if (reviews.length < 1) {
      loadingAlert.style.visiblity = "none";
      reviewsDOM.innerHTML = `<h5 class = 'empty-list'>No reiews available</h5>`;
      return;
    }
    usernameDOM.textContent = username;
    console.log(username);
    reviews.forEach((review) => {
      const {
        reviewText,
        rating,
        createdAt,
        _id: reviewID,
        author: { _id: authorID, name: authorName },
      } = review;
      if (authorID === userID) {
        usernameDOM.textContent = "you";
      }
      const allReviews = document.createElement("div");
      allReviews.classList.add("allReviews");
      allReviews.innerHTML = `<div class="single-review">
      ${
        authorID === userID
          ? `<p class = "author-name">you</p>`
          : `<p class="author-name">${authorName}</p>`
      }
        <p class="review-time">${getTimeAgo(createdAt)}</p>
        <p class="review-rating">${rating}</p>
        <p class="review-text"> ${reviewText}</p>

         <div class="review-links">
        ${
          authorID === userID
            ? `<!-- edit review -->
        <a href ="/dashboard/review/edit?id=${reviewID}" class="edit-link">
        <i class="fas fa-edit"></i>
        </a>

          <!-- delete btn -->
          <button type="button" class = "delete-btn" data-id="${reviewID}">
          <i class="fas fa-trash"></i>
          </button>`
            : ""
        }
        </div>
      `;

      reviewsDOM.appendChild(allReviews);
    });
  } catch (error) {
    console.log(error);
    reviewsDOM.innerHTML = `<h5 class="empty-list">There was an error, please try again....</h5>`;
  }
  setTimeout(() => {
    loadingAlert.style.display = "none";
  }, 500);
};

const getTimeAgo = (createdAt) => {
  const currentTime = new Date();
  //difference in milli-secs
  const diff = currentTime - new Date(createdAt);
  //difference in seconds
  const diffInSeconds = diff / 1000;
  //difference in minutes
  const diffInMinutes = diffInSeconds / 60;
  //difference in hours
  const diffInHours = diffInMinutes / 60;
  //difference in days
  const diffInDays = diffInHours / 24;
  if (diffInSeconds < 60) {
    return (
      Math.floor(diffInSeconds) +
      (Math.floor(diffInSeconds) === 1 ? " second ago" : " seconds ago")
    );
  } else if (diffInMinutes < 60) {
    return (
      Math.floor(diffInMinutes) +
      (Math.floor(diffInMinutes) === 1 ? " minute ago" : " minutes ago")
    );
  } else if (diffInHours < 24) {
    return (
      Math.floor(diffInHours) +
      (Math.floor(diffInHours) === 1 ? " hour ago" : " hours ago")
    );
  } else {
    return (
      Math.floor(diffInDays) +
      (Math.floor(diffInDays) === 1 ? " day ago" : " days ago")
    );
  }
};
//plus-minus rating button
decrement.addEventListener("click", () => {
  if (createRating.value > 1) {
    createRating.value--;
    increment.disabled = false;
  }

  if (createRating.value === "1") {
    decrement.disabled = true;
  }
  increment.removeAttribute("disabled");
});
increment.addEventListener("click", () => {
  if (createRating.value < 5) {
    createRating.value++;
    decrement.disabled = false;
  }
  if (createRating.value === 5) {
    increment.disabled = true;
  }
  decrement.removeAttribute("disabled");
});
showReviews();

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
    if (review) {
      showReviews();
    }
    createInput.value = "";
    createRating.value = "1";

    loadingAlert.style.display = "block";
  } catch (error) {
    console.log(error);
  }
  setTimeout(() => {
    loadingAlert.style.display = "none";
  }, 1000);
});

reviewsDOM.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains("delete-btn")) {
    loadingAlert.style.visiblity = "visible";
    const reviewID = el.parentElement.dataset.id;

    try {
      const { data } = await axios.delete(`/api/v1/reviews/${reviewID}`);
      showReviews();
    } catch (error) {
      console.log(error);
    }
    loadingAlert.style.visiblity = "hidden";
  }
});
