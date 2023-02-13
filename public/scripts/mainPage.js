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
        replies,
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
               <button type= "button" class ="delete-btn" data-reviewID="${reviewID}">
                <img src = "./images/icon-delete.svg" class="delete-btn" data-reviewID=${reviewID}>Delete
               </button> 
              </div>
              <!-- edit btn -->
              <div class ="edit-container">
                <a class="edit-link">
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
              <button type= "button" class ="reply-btn" data-reviewID="${reviewID}">
                <img src = "./images/icon-reply.svg">Reply
               </button> 
            </div>
          </div>
      
          `
            }
      </div>
      
      `;
      if (replies.length > 0) {
        replies.forEach((reply) => {
          const {
            _id: replyID,
            replyText,
            rating: replyRating,
            createdAt: replyTime,
            author: { _id: replyAuthorID, name: replyAuthor },
          } = reply;

          const allReplies = document.createElement("div");
          allReplies.classList.add("reply-wrapper");
          allReplies.innerHTML = `
      <div class="single-reply single-review" data-replyID="${replyID}" data-reviewID="${reviewID}">
        <div class="rating-container">
            <img src="./images/icon-plus.svg" class="plus-icon">
            <div class="create-rating">${replyRating}</div>
            <img src="./images/icon-minus.svg" class="minus-icon">
        </div>
        <div class="content-container">
          <div class="author-container">
            ${
              replyAuthorID === userID
                ? `
                <p class = "author-name">${replyAuthor}</p>
                <p class = "author-status">you</p>
                <p class="review-time">${getTimeAgo(replyTime)}</p>
          </div>
          <div class="text-container"><span>@${authorName}</span> ${replyText}</div>
        </div>
          <div class="action-links">
              <!-- delete btn -->
              <div class = "delete-container">
                <button type= "button" class ="delete-btn" data-reviewID="${reviewID}" data-replyID="${replyID}">
                  <img src = "./images/icon-delete.svg" class="delete-btn" data-id=${reviewID}>Delete
                </button> 
              </div>
                <!-- edit btn -->
              <div class ="edit-container">
                <a  class="edit-link" data-reviewID="${reviewID}" data-replyID="${replyID}">
                  <img src="./images/icon-edit.svg">Edit
                </a> 
              </div>
          </div>
            
              `
                : `
                <p class = "author-name">${replyAuthor}</p>
                <p class="review-time">${getTimeAgo(replyTime)}</p>
            </div>
            <div class = "text-content"><span>@${authorName}</span> ${replyText}</div>
          </div>

              `
            }
      </div>
      
      `;
          const editLinks = allReplies.querySelectorAll(".edit-link");
          editLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
              const parent = e.target.closest(".single-reply");
              parent.parentNode.innerHTML = `
        <div class="update-reply" data-replyID="${replyID}" data-reviewID="${reviewID}">
          <div class="rating-container">
            <img src="./images/icon-plus.svg" class="increment" alt="">
            <div class="create-rating">${replyRating}</div>
            <img src="./images/icon-minus.svg" class="decrement" alt="">
          </div>
          <div class="content-container">    
            <div class="author-container">
              <p class = "author-name">${replyAuthor}</p>
              <p class = "author-status">you</p>
              <p class="review-time">${getTimeAgo(replyTime)}</p>
            </div>
            <div class="text-content">
              <textarea placeholder="Leave your review here....." id="create-input">${replyText}</textarea>
            </div>
            <div class="review-submit">
              <button type="submit" class="submit-btn">UPDATE</button>
            </div>
          </div>
          <div class="action-links">
              <!-- delete btn -->
            <div class = "delete-container">
              <button type= "button" class ="delete-btn" data-reviewID="${reviewID}" data-replyID="${replyID}">
                <img src = "./images/icon-delete.svg" class="delete-btn" data-id=${reviewID}>Delete
              </button> 
            </div>
                <!-- edit btn -->
            <div class ="edit-container">
              <a  class="edit-link" data-reviewID="${reviewID}" data-replyID="${replyID}">
                <img src="./images/icon-edit.svg">Edit
              </a> 
            </div>
          </div>
        </div>
      
              `;

              const updateReplyDOM = document.querySelector(".update-reply");
              const increment = updateReplyDOM.querySelector(".increment");
              const decrement = updateReplyDOM.querySelector(".decrement");
              const createRating =
                updateReplyDOM.querySelector(".create-rating");
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

              const submitBtn = updateReplyDOM.querySelector(".submit-btn");
              const updateReplyID = updateReplyDOM.dataset.replyid;
              const updateReviewID = updateReplyDOM.dataset.reviewid;
              const updatedRating = updateReplyDOM.querySelector(
                ".rating-container .create-rating"
              );
              const updateInput = updateReplyDOM.querySelector("#create-input");

              submitBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                const replyText = updateInput.value;
                const rating = updatedRating.textContent;
                try {
                  const { data } = await axios.patch(
                    `/api/v1/reviews/${reviewID}/replies/${replyID}`,
                    {
                      replyText,
                      rating,
                    },
                    { withCredentials: true }
                  );
                  await showReviews();
                } catch (error) {
                  console.log(error);
                }
              });
            });
          });

          allReviews.appendChild(allReplies);
        });
      }

      overallContainer.appendChild(allReviews);
    });
  } catch (error) {
    console.log(error);
    overallContainer.innerHTML = `<h5 class="empty-list">There was an error, please try again....</h5>`;
  }
};

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

overallContainer.addEventListener("click", async (e) => {
  const el = e.target;

  if (el.classList.contains("delete-btn")) {
    deleteDOM.classList.remove("hidden");
    const replyID = el.dataset.replyid;
    const reviewID = el.dataset.reviewid;

    deleteDOM.addEventListener("click", async (e) => {
      const el = e.target;

      if (el.classList.contains("confirm-btn")) {
        try {
          if (replyID && reviewID) {
            const { data } = await axios.delete(
              `/api/v1/reviews/${reviewID}/replies/${replyID}`
            );
          } else if (reviewID) {
            const { data } = await axios.delete(`/api/v1/reviews/${reviewID}`);
          }
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
    const reviewID = el.dataset.reviewid;

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
        <button type="submit" class="reply-submit-btn submit-btn">REPLY</button>
      </div>
  `;

  const increment = replyWrapper.querySelector(".increment");
  const decrement = replyWrapper.querySelector(".decrement");
  const createRating = replyWrapper.querySelector(".create-rating");
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

  item.closest(".single-review").after(replyWrapper);

  replyWrapper.addEventListener("click", async (e) => {
    if (e.target.classList.contains("reply-submit-btn")) {
      const replyText = replyWrapper.querySelector("#create-reply").value;
      const replyRating =
        replyWrapper.querySelector(".create-rating").textContent;
      try {
        const {
          data: { response },
        } = await axios.post(
          `/api/v1/reviews/${reviewID}/replies`,
          { replyText, rating: replyRating },
          { withCredentials: true }
        );
        await showReviews();
      } catch (error) {
        console.log(errror);
      }
    }
  });
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
