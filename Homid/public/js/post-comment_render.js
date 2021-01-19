renderOnePost("fff","shdhd","shgdfhgds");


function renderpostsPage(){
document.getElementById("app").innerHTML = ``;

}

function renderOnePost(title,massage,postID){
    document.getElementById("app").innerHTML += 
   `<div class="post">
    <div id="postheder">
      <h1 class="posttitle">${title}</h1>
      <p class="postbudy">${massage}</p>
    </div>
    <!--  add comment form -->
    <div id="addComment" class="hide">

      <!--hide -->
      <div>
        <p>הוסף תגובה</p>
        <form action="">
          <textarea name="message"></textarea>
          <input type="button" value="שלח">
        </form>
      </div>

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
      <div id="AddCommentButton" class="Notifications show" onclick="ShowAddComment()">
        <span class="material-icons">
          add_circle_outline
        </span>
        <p>רשום תגובה</p>
      </div>
    </div>
  </div>`;
    
    }

function rendercomments() {

}