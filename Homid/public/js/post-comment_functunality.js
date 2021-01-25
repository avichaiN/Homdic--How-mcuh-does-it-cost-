function HideAddComment(postID) {
  console.log(postID);

  document.querySelector(`#AddCommentButton-${postID}`).classList.replace('hide', 'show');
  document.querySelector(`#cancelButton-${postID}`).classList.replace('show', 'hide');
  document.querySelector(`#addComment-${postID}`).classList.replace('show', 'hide');
}

function ShowAddComment(postID) {
  document.querySelector(`#addComment-${postID}`).innerHTML = `<div>
    <p>הוסף תגובה</p>
    <form onsubmit='handleNewComment(event)'>
      <textarea style='resize: none;' name="message"></textarea>
      <input type='text' placeholder='מחיר'>
      <input type="button" value="שלח">
    </form>
  </div>`;
  document.querySelector(`#AddCommentButton-${postID}`).classList.replace('show', 'hide');
  document.querySelector(`#cancelButton-${postID}`).classList.replace('hide', 'show');
  document.querySelector(`#addComment-${postID}`).classList.replace('hide', 'show');
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
const handleClickPost = (postId) => {
  console.log(postId)
  window.location.href = `/comments.html?${postId}`
}

// get post by id and comments by postid
const getRenderPostComments = () => {
  const url = window.location.href
  const postId = url.split('?')[1];

  fetch(`/comments/${postId}`)
    .then((res) => res.json())
    .then(async (data) => {
      if (data.status === "unauthorized") {
        window.location.href = "index.html"
      } else {
        const post = data.post
        const comments = data.comments

       /*  buildOnePost(
          "comment",
          title,
          massage,
          PostImgSrc,
          NmTimesViewed,
          numberOfComments,
          postID,
          fName,
          lName
        ) */

      /*   buildOneComment(comment, postedBy, atTdate) */
        /* buildOneComment */
        console.log('Post info:')
        console.log(post)
        console.log('Post Comments:')
        console.log(comments)
      }
    })
}
const handleNewComment = (e) =>{
  e.preventDefault()
  console.log(e)
}
