function renderpostsPage(){
document.getElementById("app").innerHTML = ``;

}

function renderOnePost(taitle,massage,postID){
    document.getElementById("app").innerHTML = ` <div class="post">
    <div id="postheder">
      <h1 class="posttitle">מזגן</h1>
      <p class="postbudy">מעוניין במתקין למזגן</p>
    </div>
    <div class="futter">
      <div>
        <span class="material-icons"> notifications </span>
        <p>תזכורת</p>
      </div>
      <div>
        <span class="material-icons"> info </span>
        <p>מידע</p>
      </div>
      <div>
        <span class="material-icons"> favorite </span>
        <p>מועדפים</p>
      </div>
    </div>
  </div>`;
    
    }

function rendercomments() {

}