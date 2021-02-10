function HideAddComment(postID) {
  document
    .querySelector(`#AddCommentButton-${postID}`)
    .classList.replace("hide", "show");
  document
    .querySelector(`#cancelButton-${postID}`)
    .classList.replace("show", "hide");
  document
    .querySelector(`#addComment-${postID}`)
    .classList.replace("show", "hide");
}

function ShowAddComment(postID) {
  document.querySelector(`#addComment-${postID}`).innerHTML = `<div>
    <p>הוסף תגובה</p>
    <form onsubmit='handleNewComment(event, "${postID}")'>
      <textarea style='resize: none;' maxlength="220" name="message"></textarea>
      <input type='text' name="price" maxlength="6" placeholder='מחיר'>
      <button class="sendCommentBtn" type="submit">שלח</button>
    </form>
  </div>`;
  document
    .querySelector(`#AddCommentButton-${postID}`)
    .classList.replace("show", "hide");
  document
    .querySelector(`#cancelButton-${postID}`)
    .classList.replace("hide", "show");
  document
    .querySelector(`#addComment-${postID}`)
    .classList.replace("hide", "show");
}

function PostFavoriteButtonClicked() {
  document.querySelector("#FavoriteButton").classList.toggle("Toggled");
}

// delete post user/admin
const handleDeletePost = (e) => {
  const postId = e.target.parentNode.dataset.id;
  const postTitle = e.target.parentNode.dataset.title;
  Swal.fire({
    title: "האם את/ה בטוח/ה?",
    html: `כותרת פוסט שנבחר: ${postTitle}<br>לא יהיה אפשר לשחזר מידע זה!`,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "לא, בטל!",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "כן, מחק פוסט!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.deleted) {
            await Swal.fire({
              position: "center",
              icon: "success",
              title: "פוסט נמחק בהצלחה",
              showConfirmButton: false,
              timer: 1500,
            });
            const url = window.location.href;
            if (url.includes("posts")) {
              location.reload();
            } else {
              window.location.href = "/categories.html";
            }
          } else {
            alert("תקלה במחיקת פוסט");
          }
        });
    }
  });
};

const checkIfUserLikedComment = async (commentId, userId) => {
  let checkLike = false;
  await fetch("/comments/user/like/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentId,
      userId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      checkLike = data.checkLike;
    });
  return checkLike;
};

const checkHowMuchLikes = async (commentId) => {
  let likedAmount;
  await fetch("/comments/likedAmount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      likedAmount = data.likeAmount;
      whoLiked = data.whoLiked
    });
  return [likedAmount, whoLiked];
};

const handleNewComment = async (e, postID) => {
  e.preventDefault();

  const userId = userInfo.id;

  const commentMessage = e.target.children.message.value;
  const commentPrice = e.target.children.price.value;
  fetch("/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postID,
      userId,
      commentMessage,
      commentPrice,
    }),
  })
    .then((res) => res.json())
    .then(async (data) => {
      if (data.posted) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "תגובה פורסמה בהצלחה",
          showConfirmButton: false,
          timer: 1500,
        });
        HideAddComment(postID);
        handleHidePostsComments(postID);
        setTimeout(function () {
          handleGetComments(postID);
        }, 500);
      } else {
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "מחיר חייב להיות אך ורק מספר.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
};

const handleDeleteComment = (commentId) => {
  Swal.fire({
    title: "האם את/ה בטוח/ה?",
    html: `לא יהיה אפשר לשחזר מידע זה!`,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "לא, בטל!",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "כן, מחק תגובה!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("/comments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.deleted) {
            const postId = data.deleteCommentFunc.postId;
            await Swal.fire({
              position: "center",
              icon: "success",
              title: "תגובה נמחקה בהצלחה",
              showConfirmButton: false,
              timer: 1500,
            });
            handleHidePostsComments(postId);
            setTimeout(function () {
              handleGetComments(postId);
            }, 500);
          }
        });
    }
  });
};

const handleLikeComment = async (commentId) => {
  const userId = userInfo.id;
  const addLike = document.querySelector(`.likeComment-${commentId}`)
  addLike.classList.add("cantClick")

  const likeHeart = document.querySelector(`.likeHeart-${commentId}`)
  likeHeart.classList.add("liked")

  fetch("/comments/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentId,
      userId,
    }),
  })
    .then((res) => res.json())
    .then(async () => {
      const likesAmount = await checkHowMuchLikes(commentId);
      document.querySelector(
        `.likeComment-${commentId}`
      ).innerHTML = `<span onclick="handleUnLikeComment('${commentId}')" class="material-icons active center liked likeHeart-${commentId}" title="הורד לייק">favorite_border
      </span><span class='likesAmount' >${likesAmount[0]}</span>`
      addLike.classList.remove("cantClick");
    });
};

const handleUnLikeComment = async (commentId) => {
  const userId = userInfo.id;
  const addLike = document.querySelector(`.likeComment-${commentId}`)
  addLike.classList.add("cantClick")

  const likeHeart = document.querySelector(`.likeHeart-${commentId}`)
  likeHeart.classList.remove("liked")
  likeHeart.classList.add("unliked")

  fetch("/comments/like", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentId,
      userId,
    }),
  })
    .then((res) => res.json())
    .then(async () => {
      const likesAmount = await checkHowMuchLikes(commentId);
      document.querySelector(
        `.likeComment-${commentId}`
      ).innerHTML = `<span onclick="handleLikeComment('${commentId}')" class="material-icons active center unliked likeHeart-${commentId}" title="לייק לתגובה">favorite_border
      </span><span class='likesAmount'>${likesAmount[0]}</span>`
      addLike.classList.remove("cantClick");;
    });
};

const handleFavoritePost = async (postID) => {

  const userId = userInfo.id;
  fetch("/posts/favorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postID,
      userId,
    }),
  })
    .then((res) => res.json())
    .then(async () => {
      document.querySelector(
        `.fav-${postID}`
      ).innerHTML = `<span class="material-icons fav" onclick="handleDeleteFavoritePost('${postID}')"> star </span><p>מועדפים</p>`;
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "פוסט נוסף למועדפים",
        showConfirmButton: false,
        timer: 1500,
      });
    });
};

const handleDeleteFavoritePost = async (postID) => {

  const userId = userInfo.id;
  fetch("/posts/favorite", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postID,
      userId,
    }),
  })
    .then((res) => res.json())
    .then(async () => {
      const url = window.location.href;
      const params = url.split("?")[1];
      document.querySelector(
        `.fav-${postID}`
      ).innerHTML = `<span class="material-icons notFav" onclick="handleFavoritePost('${postID}')"> star </span><p>מועדפים</p>`;
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "פוסט נמחק מהמועדפים",
        showConfirmButton: false,
        timer: 1500,
      });
      if (params.includes("myfavorites")) {
        location.reload();
      }
    });
};

const checkIfPostFavorite = async (postID, userId) => {
  let checkFav = false;
  await fetch("/posts/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postID,
      userId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      checkFav = data.checkFav;
    });
  return checkFav;
};

const handleGetComments = async (postId, sort) => {
  const showCommentsButton = document.querySelector(`.commentArrow-${postId}`)
  const commentSection = document.querySelector(`.renderComment-${postId}`)
  showCommentsButton.classList.add("cantClick")

  const numberOfComments = await checkHowMuchComments(postId);

  if (commentSection.innerHTML.length > 0 || numberOfComments < 1) {
    handleHidePostsComments(postId);
    showCommentsButton.classList.remove("cantClick")
  } else {
    blockLoadMore = true;
    canLoadMore = false;
    const loadingComments = document.querySelector(
      `.loadingComments-${postId}`
    );
    loadingComments.style.display = "flex";
    fetch(`/comments/${postId}`)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status === "unauthorized") {
          window.location.href = "index.html";
        } else {
          if (sort == "date") {
            renderCommentsToDom(postId, data, "date");
          } else if (sort == "like") {
            renderCommentsToDom(postId, data, "like");
          } else {
            renderCommentsToDom(postId, data, "def");
          }
        }
      });
  }
};

const sortCommentsByDate = (postId) => {
  const sortCommentsButtons = document.querySelector(`.sortComments-${postId}`)
  sortCommentsButtons.classList.add("cantClick")
  const app = document.querySelector(`.renderComment-${postId}`);
  app.innerHTML = "";
  handleGetComments(postId, "date");
};
const sortCommentsByLike = (postId) => {
  const sortCommentsButtons = document.querySelector(`.sortComments-${postId}`)
  sortCommentsButtons.classList.add("cantClick")
  const app = document.querySelector(`.renderComment-${postId}`);
  app.innerHTML = "";
  handleGetComments(postId, "like");
};
const renderCommentsToDom = async (postId, data, sort) => {
  const numberOfComments = await checkHowMuchComments(postId);
  let comments = data.comments;
  const whenCommentsPosted = data.whenPostedArray
  userId = userInfo.id;

  if (sort == "like") {
    comments.sort(function (a, b) {
      return b.likes.length - a.likes.length;
    });
  } else if (sort == "date") {
    comments = comments.reverse();
  }

  const app = document.querySelector(`.renderComment-${postId}`);
  const loadingComments = document.querySelector(`.loadingComments-${postId}`);
  const showCommentsButton = document.querySelector(`.commentArrow-${postId}`)
  const sortCommentsButtons = document.querySelector(`.sortComments-${postId}`)
  const hideCommentsButton = document.querySelector(`.closeComments-${postId}`);
  const sortComments = document.querySelector(`.sortComments-${postId}`);
  app.innerHTML = "";
  let commentsHtml = "";

  const priceAverage = getAveragePrice(comments)
  const averageDom = document.querySelector(`.average-${postId}`)
  averageDom.innerHTML = `מחיר ממוצע לפי תגובות: ${priceAverage}₪`

  document.querySelector(
    `.commentArrow-${postId}`
  ).innerHTML = `<span data-id='${postId}' data-comments='${numberOfComments}'  class="material-icons">arrow_upward</span>
<p data-id='${postId}' data-comments='${numberOfComments}'>תגובות: ${numberOfComments}</p>`;

await Promise.all(
  comments.map(async (comment) => {
    const getUserWhoPosted = await getWhoPosted(comment.publishedBy)
    const likesAmount = await checkHowMuchLikes(comment._id)
    comment.fName = getUserWhoPosted.fName
    comment.lName = getUserWhoPosted.lName
    comment.isLiked = likesAmount[1]
    comment.likeAmount = likesAmount[0]
  })
)
console.log(comments)
comments.forEach(comment=>{
  let isUsersComment = false;
  let timeAgoPosted
  let liked = false

  
  if (comment.publishedBy === userId || isAdmin) {
    isUsersComment = true;
  }

  whenCommentsPosted.forEach(timeAgo => {
    if (timeAgo.commentId === comment._id) {
      timeAgoPosted = timeAgo.timeAgo
    }
  })

  if (comment.isLiked.includes(userInfo.id)) {
    liked = true
  }

  const fullComment = buildOneComment(
    comment.desc,
    comment.price,
    comment.fName,
    comment.lName,
    comment,
    timeAgoPosted,
    comment._id,
    liked,
    comment.likeAmount,
    isUsersComment
  );
  commentsHtml += fullComment;
})
 
  app.innerHTML = commentsHtml;
  loadingComments.style.display = "none";
  hideCommentsButton.style.display = "block";
  sortComments.style.display = "flex";
  showCommentsButton.classList.remove("cantClick")
  sortCommentsButtons.classList.remove("cantClick")
  averageDom.style.display = "block"
  setTimeout(function () {
    canLoadMore = true;
    blockLoadMore = false;
  }, 50);
};
const handleHidePostsComments = (postId) => {
  fetch(`/comments/${postId}`)
    .then((res) => res.json())
    .then(async (data) => {
      if (data.status === "unauthorized") {
        window.location.href = "index.html";
      } else {
        const commentsLength = data.comments.length;
        document.querySelector(
          `.commentArrow-${postId}`
        ).innerHTML = `<span data-id='${postId}' class="material-icons">arrow_downward</span>
      <p data-id='${postId}'>תגובות: ${commentsLength}</p>`;
        const hideCommentsButton = document.querySelector(
          `.closeComments-${postId}`
        );
        const sortComments = document.querySelector(`.sortComments-${postId}`);
        const app = document.querySelector(`.renderComment-${postId}`);
        const averageDom = document.querySelector(`.average-${postId}`)
        hideCommentsButton.style.display = "none";
        app.innerHTML = "";
        sortComments.style.display = "none";
        averageDom.style.display = "none"
      }
    });
};
const getAveragePrice = (comments) => {
  let commentsPrice = []
  comments.forEach(comment => {
    commentsPrice.push(comment.price)
  })
  let sum = 0;
  for (i = 0; i < commentsPrice.length; i++) {
    sum += parseInt(commentsPrice[i], 10);
  }
  const x = sum / commentsPrice.length;
  let priceAvarge = ~~x
  return priceAvarge
}
