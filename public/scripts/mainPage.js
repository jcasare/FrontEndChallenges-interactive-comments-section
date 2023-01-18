const reviewForm = document.querySelector("#review-form");
const createInput = document.querySelector("#create-input");
const createRating = document.querySelector("#create-rating");
const reviewContainer = document.querySelector("#reviews-container");
const loadingAlert = document.querySelector(".loading-text");
const reviewsDOM = document.querySelector(".reviews");
const decrement = document.querySelector("#decrement");
const increment = document.querySelector("#increment");
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

// Load Reviews from /api/v1/revies
// const showReviews = async () => {
//   // loadingAlert.style.visiblity = "visible";
//   try {
//     const {
//       data: { reviews, userID },
//     } = await axios.get("/api/v1/reviews");
//     if (reviews.length < 1) {
//       loadingAlert.style.visiblity = "none";
//       reviewsDOM.innerHTML = `<h5 class = 'empty-list'>No reiews available</h5>`;
//       return;
//     }
//     reviews
//       .forEach((review) => {
//         const {
//           reviewText,
//           rating,
//           createdAt,
//           _id: reviewID,
//           author: { _id: authorID, name: authorName },
//         } = review;
//       const singleReview = `<div class="single-review">
//         <p class="author-name">${authorName}</p>
//         <p class="review-time">${getTimeAgo(createdAt)}</p>
//         <p class="review-rating">${rating}</p>
//         <p class="review-text"> ${reviewText}</p>

//         <div class="review-links">
//           ${
//             authorID === userID
//               ? `<!-- edit review -->
//               <a href ="/reviews/edit?id=${encodeURIComponent(
//                 reviewID
//               )}" class="edit-link">
//               <i class="fas fa-edit"></i>
//               </a>

//               <!-- delete btn -->
//               <button type="button" class = "delete-btn" data-id="${reviewID}">
//               <i class="fas fa-trash"></i>
//               </button>`
//               : ""
//           }
//         </div>
//       </div>`;
//       reviewsDOM.innerHTML += singleReview  } catch (error) {
//     reviewsDOM.innerHTML = `<h5 class="empty-list">There was an error, please try again....</h5>`;
//   }
//   setTimeout(() => {
//     loadingAlert.style.display = "none";
//   }, 1000);
// };

const showReviews = async () => {
  loadingAlert.style.visiblity = "visible";
  try {
    const {
      data: { reviews, userID },
    } = await axios.get("/api/v1/reviews");
    if (reviews.length < 1) {
      loadingAlert.style.display = "none";
      reviewsDOM.innerHTML = `<h5 class="empty-list">No reviews available</h5>`;
      return;
    }
    reviews.forEach((review) => {
      const {
        _id: reviewID,
        reviewText,
        rating,
        createdAt,
        author: { _id: authorID, name: authorName },
      } = review;

      // create the single review element
      const singleReview = document.createElement("div");
      singleReview.classList.add("single-review");

      //create author element
      const authorNameElement = document.createElement("p");
      authorNameElement.classList.add("author-name");
      authorNameElement.textContent = authorName;
      singleReview.appendChild(authorNameElement);

      //review time element
      const reviewTimeElement = document.createElement("p");
      reviewTimeElement.classList.add("review-time");
      reviewTimeElement.textContent = getTimeAgo(createdAt);
      singleReview.appendChild(reviewTimeElement);

      //review rating element
      const reviewRatingElement = document.createElement("p");
      reviewRatingElement.classList.add("review-rating");
      reviewRatingElement.textContent = rating;
      singleReview.appendChild(reviewRatingElement);

      //review text element
      const reviewTextElement = document.createElement("p");
      reviewTextElement.classList.add("review-text");
      reviewTextElement.textContent = reviewText;
      singleReview.appendChild(reviewTextElement);

      //review links
      const reviewLinks = document.createElement("div");
      reviewLinks.classList.add("review-links");
      if (userID === authorID) {
        //edit link
        const editLink = document.createElement("a");
        editLink.href = "/reviews/edit?id=" + reviewID;
        editLink.classList.add("edit-link");
        editLink.innerHTML = '<i class="fas fa-edit"></i>';
        reviewLinks.appendChild(editLink);

        //delete btn
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.setAttribute("data-id", reviewID);
        deleteBtn.setAttribute("type", "submit");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        reviewLinks.appendChild(deleteBtn);

        //button event listener

        deleteBtn.addEventListener("click", async (e) => {
          e.preventDefault();
        });
      }
      singleReview.appendChild(reviewLinks);

      reviewsDOM.appendChild(singleReview);

      return;
    });
  } catch (error) {
    reviewsDOM.innerHTML = `<h5 class="empty-list">There was an error, please try again....</h5>`;
    console.log(error);
  }
  setTimeout(() => {
    loadingAlert.style.display = "none";
  }, 500);
};
// const showReviews = async () => {
//   // loadingAlert.style.visibility = "visible";
//   try {
//     const {
//       data: { reviews, userID },
//     } = await axios.get("/api/v1/reviews");

//     if (reviews.length < 1) {
//       loadingAlert.style.visibility = "none";
//       reviewsDOM.innerHTML = `<h5 class = 'empty-list'>No reviews available</h5>`;
//       return;
//     }

//     // reviews.forEach((review) => {
//     //   const {
//     //     reviewText,
//     //     rating,
//     //     createdAt,
//     //     _id: reviewID,
//     //     author: { _id: authorID, name: authorName },
//     //   } = review;
//     const allReviews = reviews.map((review)=>{
//       const {reviewText, rating, createdAt, author:{_id:authorID, name:authorName}}= review;
//       return `<div class="single-review>

//       </div>"`
//     })

//       const singleReview = `<div class="single-review">
//         <p class="author-name">${authorName}</p>
//         <p class="review-time">${getTimeAgo(createdAt)}</p>
//         <p class="review-rating">${rating}</p>
//         <p class="review-text"> ${reviewText}</p>

//         <div class="review-links">
//           ${
//             authorID === userID
//               ? `<!-- edit review -->
//               <a href ="/reviews/edit?id=${encodeURIComponent(
//                 reviewID
//               )}" class="edit-link">
//               <i class="fas fa-edit"></i>
//               </a>

//               <!-- delete btn -->
//               <button type="button" class = "delete-btn" data-id="${reviewID}">
//               <i class="fas fa-trash"></i>
//               </button>`
//               : ""
//           }
//         </div>
//       </div>`;
//       reviewsDOM.innerHTML += singleReview;
//     });
//   } catch (error) {
//     reviewsDOM.innerHTML = `<h5 class="empty-list">There was an error, please try again....</h5>`;
//   }
//   setTimeout(() => {
//     loadingAlert.style.display = "none";
//   }, 1000);
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

// const getReviews = async () => {
//   try {
//     const {
//       data: { reviews },
//     } = await axios.get("/api/v1/reviews");
//     for (let review of reviews) {
//       showReview(review);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// document.addEventListener("load", getReviews());
// function showReview(review) {
//   const reviewElement = document.createElement("div");
//   reviewElement.classList.add("review");

//   const authorElement = document.createElement("p");
//   authorElement.classList.add("review-author");
//   authorElement.textContent = review.author.name;
//   const reviewTimeElement = document.createElement("p");
//   reviewTimeElement.classList.add("review-time");
//   reviewTimeElement.textContent = getTimeAgo(review.createdAt);

//   const reviewTextElement = document.createElement("p");
//   reviewTextElement.classList.add("review-text");
//   reviewElement.textContent = review.reviewText;
//   reviewElement.appendChild(authorElement);
//   reviewElement.appendChild(reviewTextElement);
//   reviewElement.appendChild(reviewTimeElement);
//   reviewContainer.appendChild(reviewElement);
// }
// function addNewReview(review) {
//   const newReviewElement = document.createElement("div");
//   newReviewElement.innerHTML = `<p class = 'review-text'>${
//     review.reviewText
//   }</p>
//         <p class = 'review-author'>${review.author.name}</p>
//         <p class = 'review-time'>${getTimeAgo(review.createdAt)}</p>`;
//   reviewContainer.appendChild(newReviewElement);
//   window.location.href = "/dashboard";
// }
