const type = 'post';
const massage =
  'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיע';
const title = 'מזגן';
const NmTimesViewed = '36';
const postID = 'sklgkh78h89xchv';


const comment = 'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיע';
const postedBy = 'eyal shemuel'
const atTdate = "01/01/1999"



function buildOnePost(
  type /*post or comment*/,
  title,
  massage,
  PostImgSrc,
  NmTimesViewed,
  postID
) {
  /*  */
  const AddCommentButton = ` <div id="AddCommentButton" class="Notifications show" onclick="ShowAddComment()">
    <span class="material-icons">
      add_circle_outline
    </span>`;
  /*  */
  const TimesViewed = ` <div id="TimesViewed">
    <span class="material-icons"> visibility </span>
    <p>נצפה ${NmTimesViewed} פעמים</p>
  </div>`;
  let leftButton;
  if (type == 'post') {
    leftButton = AddCommentButton;
  } else {
    if (type == 'comment') {
      leftButton = TimesViewed;
    } else {
      leftButton = 'error wrong input type';
    }
  }
  /*  */

  const html = `<div class="post">
    <div data-id='${postID}' id="postheder">
    <button class='adminDeletePost' style="display:none;" onclick="handleDeletePost(event)">מחק פוסט</button>
      <h1 class="posttitle">${title}</h1>
      <p class="postbudy">${massage}</p>
      <img id="hederImg" src="${PostImgSrc}" alt="" />
    </div>
    <!--  add comment form -->
    <div id="addComment" class="hide">
      <!--hide -->     
    </div>
    <!--  end add comment form -->
    <div class="futter">
      <div id="NotificationsButton" class="Notifications" onclick="PostNotificationsButtonClicked()">
        <span class="material-icons"> notifications </span>
        <p>תזכורת</p>
      </div>
      <div id="FavoriteButton" class="Notifications" onclick="PostFavoriteButtonClicked()">
        <span class="material-icons"> favorite </span>
        <p>מועדפים</p>
      </div>
      <div id="cancelButton" class="Notifications hide" onclick="HideAddComment()">
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
    </div>
  </div>`;
  return html;
}



function buildOneComment(comment, postedBy, atTdate) {
  const Html =
    `<article class="comment">
   <div ID="bodyComment">
     <p>
      ${massage}
     </p>
   </div>
   <div id="authRouter">
     <p>add by:${postedBy} at ${atTdate}</p>
   </div>
 
   <div id="AddToFavoritButton">
     <span class="material-icons active center" title="הוסף פוסט זה למועדפים">
       favorite
     </span>
   </div>
  </article>`;

  return Html;
}



function renderPostsHeder(HederTitle, src) {
  document.querySelector(`#categoryHeder`).innerHTML +=
    `<h1>${HederTitle}</h1>
        <img id="hederImg" src="/./${src}" alt="" />`
}
const noPostsFound = (keywords) => {
  document.querySelector(`#categoryHeder`).innerHTML +=
    `<h1>לא נמצאו פוסטים הכוללים: ${keywords}</h1>`
}
const postsFoundTitle = (keywords) => {
  document.querySelector(`#categoryHeder`).innerHTML +=
    `<h1>תוצאות חיפוש - ${keywords}</h1><br>`
}
const displayPostsAdmin = async () => {
  let checkAdmin = await handleCheckAdmin();

  if (checkAdmin) {
    console.log('u be admin')
    setTimeout(() => {
      let deleteButton = document.querySelectorAll(".adminDeletePost"), i;
      for (i = 0; i < deleteButton.length; ++i) {
        deleteButton[i].style.display = "block";
      }
    }, 1500);
  }
}
const handleDeletePost = (e) => {

  const postId = e.target.parentNode.dataset.id
  const areYouSure = confirm(
    `האם למחוק פוסט ${postId}?`
  );
  if (areYouSure) {
    fetch("/posts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deleted) {
          location.reload();
        }else{
          alert('תקלה במחיקת פוסט')
        }
      });
  }
}