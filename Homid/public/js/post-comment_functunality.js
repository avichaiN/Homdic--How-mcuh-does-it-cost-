// function showAddpost() {
//   document.querySelector('.newPostBox').classList.replace('hide', 'show');
//   document.querySelector('#addPostbutton').classList.replace('show', 'hide');
//   document.querySelector('#removePostbutton').classList.replace('hide', 'show');

// }
// function hideAddpost() {
//   console.log('hide');
//   document.querySelector('.newPostBox').classList.replace('show', 'hide');
//   document.querySelector('#addPostbutton').classList.replace('hide', 'show');
//   document.querySelector('#removePostbutton').classList.replace('show', 'hide');
// }
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


// delete post user/admin
const handleDeletePost = (e) => {

  const postId = e.target.parentNode.dataset.id
  const postTitle = e.target.parentNode.dataset.title

  Swal.fire({
    title: 'האם את/ה בטוח/ה?',
    html: `כותרת פוסט שנבחר: ${postTitle}<br>לא יהיה אפשר לשחזר מידע זה!`,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: "לא, בטל!",
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'כן, מחק פוסט!'
  }).then((result) => {
    if (result.isConfirmed) {

      fetch("/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.deleted) {
            await Swal.fire({
              position: "center",
              icon: "success",
              title: "פוסט נמחק בהצלחה",
              showConfirmButton: false,
              timer: 1000,
            });
            location.reload();
          } else {
            alert('תקלה במחיקת פוסט')
          }
        });
    }
  })
}
const handleClickPost = (postId) =>{
  console.log(postId)
  window.location.href = `/comments.html?${postId}`
}
const renderPostComments = () =>{
  const url = window.location.href
  const params = url.split('?')[1];
  console.log(params)
}
