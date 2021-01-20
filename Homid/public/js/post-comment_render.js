const type = "post";
const massage ="לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיע";
const title = "מזגן";
const NmTimesViewed = "36"
const postID = "sklgkh78h89xchv"

renderOnePost(type/*post or comment*/,title,massage,NmTimesViewed,postID);




function renderpostsPage(){
document.getElementById("app").innerHTML = ``;
}

function renderOnePost(type/*post or comment*/,title,massage,NmTimesViewed,postID){
    const AddCommentButton = ` <div id="AddCommentButton" class="Notifications show" onclick="ShowAddComment()">
    <span class="material-icons">
      add_circle_outline
    </span>`
    const TimesViewed = ` <div id="TimesViewed">
    <span class="material-icons"> visibility </span>
    <p>נצפה ${NmTimesViewed} פעמים</p>
  </div>`
let leftButton;
  if(type=="post"){
    leftButton = AddCommentButton;
  }else{
    if(type=="comment"){
      leftButton = TimesViewed;
    }else{
      leftButton = "error rong input type"
    }
  }
  
  document.getElementById("app").innerHTML += 
   `<div class="post">
    <div id="postheder">
      <h1 class="posttitle">${title}</h1>
      <p class="postbudy">${massage}</p>
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
    
    }

function rendercomments() {

}