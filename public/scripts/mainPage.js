const reviewForm = document.querySelector("#review-form");
const createInput = document.querySelector("#create-input");
const createRating = document.querySelector(".create-rating");
const reviewContainer = document.querySelector("#reviews-container");
const loadingAlert = document.querySelector(".loading-text");
const overallContainer = document.querySelector(".overall-container");
const overallWrapper = document.querySelector(".overall-wrapper");
const deleteDOM = document.querySelector(".delete-alert-container");
const decrement = document.querySelector(".decrement");
const increment = document.querySelector(".increment");

// Load Reviews from /api/v1/reviews

const showReviews = async () => {
  overallContainer.innerHTML = "";
  try {
    const {
      data: { reviews, userID, username },
    } = await axios.get("/api/v1/reviews");
    if (reviews.length < 1) {
      overallContainer.innerHTML = `<h5 class = 'empty-list'>No reiews available</h5>`;
      return;
    }

    reviews.forEach((review) => {
      const {
        reviewText,
        rating,
        createdAt,
        _id: reviewID,
        author: { _id: authorID, name: authorName },
      } = review;
      const allReviews = document.createElement("div");
      allReviews.classList.add("wrapper");
      allReviews.innerHTML = `
      <div class="single-review">
        <div class="rating-container">
            <img src="./images/icon-plus.svg" class="plus-icon">
            <div class="create-rating">${rating}</div>
            <img src="./images/icon-minus.svg" class="minus-icon">
        </div>  
        <div class="content-container">
            <div class="author-container">
            ${
              authorID === userID
                ? `
              <p class = "author-name">${authorName}</p>
              <p class = "author-status">you</p>
              <p class="review-time">${getTimeAgo(createdAt)}</p>
            </div> 
            
            <div class ="text-container">
            ${reviewText}
            </div>     
       </div>
        <div class="action-links">
              <!-- delete btn -->
              <div class = "delete-container">
               <button type= "button" class ="delete-btn" data-id="${reviewID}">
                <img src = "./images/icon-delete.svg">Delete
               </button> 
              </div>
              <!-- edit btn -->
              <div class ="edit-container">
                <a href ="/dashboard/review/edit?id=${reviewID}" class="edit-link">
                  <img src="./images/icon-edit.svg">Edit
                </a> 
              </div>
            </div>       
          `
                : `
          
          <p class="author-name">${authorName}</p>
          
          <p class = "review-time">${getTimeAgo(createdAt)}</p>
          </div>

            <div class = "text-container">
            ${reviewText}
            </div>
          </div>
          <div class="action-links">
            <div class="reply-container">
              <button type= "button" class ="reply-btn" data-id="${reviewID}">
                <img src = "./images/icon-reply.svg">Reply
               </button> 
            </div>
          </div>
      
          `
            }
      </div>
      
      `;

      overallContainer.appendChild(allReviews);
    });
  } catch (error) {
    console.log(error);
    overallContainer.innerHTML = `<h5 class="empty-list">There was an error, please try again....</h5>`;
  }
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
  if (createRating.textContent > 1) {
    createRating.textContent--;
    increment.disabled = false;
  }

  if (createRating.textContent === "1") {
    decrement.disabled = true;
  }
  increment.removeAttribute("disabled");
});
increment.addEventListener("click", () => {
  if (createRating.textContent < 5) {
    createRating.textContent++;
    decrement.disabled = false;
  }
  if (createRating.textContent === 5) {
    increment.disabled = true;
  }
  decrement.removeAttribute("disabled");
});
showReviews();

reviewForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const reviewText = createInput.value;
  const rating = createRating.textContent;
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
  } catch (error) {
    console.log(error);
  }
});

overallContainer.addEventListener("click", (e) => {
  const el = e.target;
  const reviewID = el.dataset.id;
  if (el.classList.contains("delete-btn")) {
    deleteDOM.classList.remove("hidden");
    deleteDOM.addEventListener("click", async (e) => {
      const el = e.target;
      if (el.classList.contains("confirm-btn")) {
        try {
          const { data } = await axios.delete(`/api/v1/reviews/${reviewID}`);
          deleteDOM.classList.add("hidden");
          await showReviews();
        } catch (error) {
          console.log(error);
        }
      } else if (el.classList.contains("cancel-btn")) {
        deleteDOM.classList.add("hidden");
        return;
      }
    });
  } else if (el.parentElement.classList.contains("reply-container")) {
    const reviewID = el.dataset.id;
    createReplyWrapper(el.closest(".single-review"), reviewID);
  }
});

const createReplyWrapper = (item, reviewID) => {
  document.querySelectorAll(".create-reply").forEach((el) => {
    el.remove();
  });
  const replyWrapper = document.createElement("div");
  replyWrapper.classList.add("create-reply");
  replyWrapper.innerHTML = `
    <div class="rating-container">
        <img src="./images/icon-plus.svg" class="increment" alt="">
        <div class="create-rating">3</div>
        <img src="./images/icon-minus.svg" class="decrement" alt="">
      </div>
      <div class="text-content">
        <textarea placeholder="Leave your reply here..." id="create-reply"></textarea>
      </div>
      <div class = "reply-submit-container review-submit">
        <button type="submit" class="submit-btn">REPLY</button>
      </div>
  `;
  const replyBtn = document.querySelector(".reply-submit-container button");
  const replyTextDOM = document.querySelector(".create-reply .text-content");
  const replyRatingDOM = document.querySelector(
    ".create-reply .rating-container .create-rating"
  );
  replyBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const replyText = replyTextDOM.value;
    const replyRating = replyRatingDOM.textContent;
    try {
      const {
        data: { reply },
      } = await axios.post(
        "/api/v1/replies",
        {
          replyText,
          rating: replyRating,
        },
        { withCredentials: true }
      );
      if (reply) {
        showReviews();
      }
    } catch (error) {
      console.log(error);
    }
  });
  console.log(reviewID);
  item.closest(".single-review").after(replyWrapper);
};
