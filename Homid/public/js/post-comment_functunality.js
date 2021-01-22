function showAddpost() {
  document.querySelector('.AddPost').classList.replace('hide', 'show');
  document.querySelector('#addPostbutton').classList.replace('show', 'hide');
  document.querySelector('#removePostbutton').classList.replace('hide', 'show');
}
function hideAddpost() {
  console.log('hide');
  document.querySelector('.AddPost').classList.replace('show', 'hide');
  document.querySelector('#addPostbutton').classList.replace('hide', 'show');
  document.querySelector('#removePostbutton').classList.replace('show', 'hide');
}
function HideAddComment() {
  document.querySelector('#AddCommentButton').classList.replace('hide', 'show');
  document.querySelector('#cancelButton').classList.replace('show', 'hide');
  document.querySelector('#addComment').classList.replace('show', 'hide');
}

function ShowAddComment() {
  document.querySelector('#addComment').innerHTML = `<div>
    <p>הוסף תגובה</p>
    <form action="">
      <textarea name="message"></textarea>
      <input type="button" value="שלח">
    </form>
  </div>`;
  document.querySelector('#AddCommentButton').classList.replace('show', 'hide');
  document.querySelector('#cancelButton').classList.replace('hide', 'show');
  document.querySelector('#addComment').classList.replace('hide', 'show');
}
function PostNotificationsButtonClicked() {
  document.querySelector('#NotificationsButton').classList.toggle('Toggled');
}
function PostFavoriteButtonClicked() {
  document.querySelector('#FavoriteButton').classList.toggle('Toggled');
}

const displayPostsAdmin = async () => {
  let checkAdmin = await handleCheckAdmin();

  if (checkAdmin) {
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
        } else {
          alert('תקלה במחיקת פוסט')
        }
      });
  }
}
