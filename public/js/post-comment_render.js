function hendelImgClick(src, postID) {
  let x = document.querySelector(`.postImg-${postID}`)
  const currWidth = x.clientWidth;
  const currHeight = x.clientHeight;
  console.log(currWidth,currHeight)

  Swal.fire({
    imageUrl: src,
    imageWidth: currWidth+100,
    imageHeight: currHeight+100,
    imageAlt: "",
    confirmButtonText: "X",
  });
}
function buildOnePost(
  type /*post or comment*/,
  title,
  massage,
  PostImgSrc,
  postCreatedTime,
  whenMade,
  NmTimesViewed,
  numberOfComments,
  postID,
  fName,
  lName,
  isFavorite
) {
  let img = `<img id="postImg" class='postImg-${postID}' onclick="hendelImgClick('data:image/jpg;base64,${PostImgSrc}', '${postID}')" src="data:image/jpg;base64,${PostImgSrc}" alt="" />`;
  if (!PostImgSrc) {
    img = "";
  }

  const fullDate = new Date(postCreatedTime);
  let favoriteButton = "";
  /*  */
  const AddCommentButton = ` <div id="AddCommentButton-${postID}" class="Notifications show" onclick="ShowAddComment('${postID}')">
    <span class="material-icons">
      add_comment
    </span>`;
  /*  */
  const TimesViewed = ` <div id="TimesViewed">
    <span class="material-icons"> visibility </span>
    <p>נצפה ${NmTimesViewed} פעמים</p>
  </div>`;
  let leftButton;
  if (type == "post") {
    leftButton = AddCommentButton;
  } else {
    if (type == "comment") {
      leftButton = TimesViewed;
    } else {
      leftButton = "error wrong input type";
    }
  }
  if (isFavorite) {
    favoriteButton = `<span class="material-icons fav" id="favoriteIcon-${postID}" onclick="handleDeleteFavoritePost('${postID}')"> star </span><p id="favoriteWord-${postID}">מועדפים</p>`;
  } else {
    favoriteButton = `<span class="material-icons" id="favoriteIcon-${postID}" onclick="handleFavoritePost('${postID}')"> star </span><p id="favoriteWord-${postID}">מועדפים</p>`;
  }
  let sort = "def";
  /*  */

  const html = `<div class="post" data-test='tt'>
      <div data-id='${postID}' data-title='${title}' id="postheder">
    <p class='whenPosted' title='${fullDate}'>לפני ${whenMade}</p>
    <p class="userInfo">${fName + " " + lName}</p>
      <h1 class="posttitle">${title}</h1>
      <p class="postbudy">${massage}</p>
      ${img}

    </div>
    <!--  add comment form -->
    <div id="addComment-${postID}" class="hide addComment">
      <!--hide -->     
    </div>
    <!--  end add comment form -->
    <div class="futter">
      <div onclick="handleGetComments('${postID}', '${sort}') " id="NotificationsButton" class="Notifications commentArrow commentArrow-${postID}">
        <span data-id='${postID}' class="material-icons">arrow_downward</span>
        <p data-id='${postID}'>תגובות: ${numberOfComments}</p>
      </div>
      <div id="FavoriteButton" class="Notifications fav-${postID}">
      ${favoriteButton}
      </div>
      <div id="cancelButton-${postID}" class="Notifications hide" onclick="HideAddComment('${postID}')">
        <span class="material-icons">
          add_circle_outline
        </span>
        <p>בטל</p>
      </div>
      <div id="leftButton">
      ${leftButton}
        <p>רשום תגובה</p>
      </div>
      </div>
      <div data-id='${postID}' data-title='${title}' class='deletePost' id='${postID}'></div>
    </div>
  </div>
  <div class='sortComments sortComments-${postID}'>
  <button onclick='sortCommentsByDate("${postID}")'>לפי תאריך</button>
  <button onclick='sortCommentsByLike("${postID}")'>לפי לייקים</button>
  </div>
  <div class="average average-${postID}"></div>
  <div class='renderComment renderComment-${postID}'></div>
  <div class="loadingComments loadingComments-${postID}" data-title=".dot-spin">
  <div class="dot-spin"></div>
</div>
  <button class='closeComments closeComments-${postID}' onclick="handleGetComments('${postID}', '${sort}')">החבא תגובות של פוסט זה</button>`;

  return html;
}

function buildOneComment(
  comment,
  price,
  fName,
  lName,
  commentCreatedTime,
  atTdate,
  commentId,
  liked,
  likesNum,
  isUsersComment
) {
  const fullDate = new Date(commentCreatedTime);
  let deleteComment = "";
  if (isUsersComment) {
    deleteComment = `<button class='deletePostButton' onclick="handleDeleteComment('${commentId}')">מחק תגובה</button>`;
  }
  let likedButton = "";
  if (liked) {
    likedButton = `<span onclick="handleUnLikeComment('${commentId}')" class="material-icons active center liked likeHeart-${commentId}" title="הורד לייק">favorite_border
    </span>`;
  } else {
    likedButton = `<span onclick="handleLikeComment('${commentId}')" class="material-icons active center unliked likeHeart-${commentId}" title="לייק לתגובה">favorite_border
    </span>`;
  }
  const Html = `<article class="comment">
   <div ID="bodyComment">
     <p>
      ${comment}
     </p>
     מחיר: ${price}₪
   </div>
   <div id="authRouter">
   <p title="${fullDate}">לפני ${atTdate}</p>
     <p>${fName} ${lName}</p>
   </div>
   <div data-id='${commentId}' class="deleteComment">${deleteComment}</div>
   <div id="likeComment" class="likeComment-${commentId}">
   ${likedButton}
   <span class='likesAmount'>${likesNum}</span>
   </div>
  </article>`;

  return Html;
}

function renderPostsHeder(HederTitle, src) {
  document.querySelector(
    `#categoryHeder`
  ).innerHTML = `<h1 class="headerTitle">${HederTitle}</h1>
    <img id="hederImg" src="data:image/jpg;base64,${src}" alt="" />
    <button onclick="displayPostBox(event)" class="newPostButton">פוסט חדש</button>`;
}
const renderNoPostsFound = (keywords) => {
  document.querySelector(
    `#categoryHeder`
  ).innerHTML = `<h1>לא נמצאו פוסטים הכוללים: ${keywords}</h1>
    <button onclick="displayPostBox(event)" class="newPostButton">פוסט חדש</button>`;
};
const renderSearchedPostsTitle = (keywords) => {
  document.querySelector(
    `#categoryHeder`
  ).innerHTML = `<h1>תוצאות חיפוש - ${keywords}</h1><br>
    <button onclick="displayPostBox(event)" class="newPostButton">פוסט חדש</button>`;
};
const renderTitleFoundPostsUser = (name) => {
  document.querySelector(
    `#categoryHeder`
  ).innerHTML = `<h1>שלום ${name}, הפוסטים שפירסמת:</h1>
    <button onclick="displayPostBox(event)" class="newPostButton">פוסט חדש</button>`;
};
const renderTitlePostForAdmin = (username) => {
  document.querySelector(
    `#categoryHeder`
  ).innerHTML = `<h2>פוסטים של שם משתמש: ${username}</h2>
    <button onclick="displayPostBox(event)" class="newPostButton">פוסט חדש</button>`;
};
const renderTitlePostFavorits = () => {
  document.querySelector(
    `#categoryHeder`
  ).innerHTML = `<h1>פוסטים מועדפים</h1>
  <button onclick="displayPostBox(event)" class="newPostButton">פוסט חדש</button>`;
};
