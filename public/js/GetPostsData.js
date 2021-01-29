const getPosts = () => {

  const url = window.location.href
  const params = url.split('?')[1];

  if (params === 'search') {
    const searchedPosts = url.split('?')[2];
    getPostsBySearch(searchedPosts)
  } else if (params === 'myposts') {
    getPostsByUser()
  } else if (params === 'myfavorites') {
    getUserFavorites()
  } else if (params.includes('admin')) {
    getPostsUserIdForAdmin(params)
  } else {
    getPostsByCategory(params)
  }
};

const getPostsBySearch = (searchedPosts) => {
  fetch(`/posts/search/get/${searchedPosts}`)
    .then((res) => res.json())
    .then(async (data) => {
      let keywords = data.searchedSplitted
      let foundPosts = data.foundPosts
      if (data.status === "unauthorized") {
        window.location.href = "index.html"
      } else {

        if (foundPosts.length == 0) {
          renderNoPostsFound(keywords)
        } else {
          renderSearchedPostsTitle(keywords)
        }
        renderPosts(foundPosts)
      }
    });
}
const getPostsByCategory = (categoryId) => {

  // this is when user clicks category
  fetch("/category/byid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryId }),
  })
    .then((res) => res.json())
    .then((data) => {

      renderPostsHeder(data.categoryInfo[0].Name, data.categoryInfo[0].Img);
    });

  // this is when looking for category id
  fetch(`/posts/get/${categoryId}`)
    .then((res) => res.json())
    .then(async (data) => {
      if (data.status === "unauthorized") {
        window.location.href = "index.html"
      } else {

        let foundPosts = data.foundPostsByCategoryId
        // const sorted = foundPosts.sort((a, b) => b.createdAt - a.createdAt)
        // console.log(sorted)
        // console.log(foundPosts)
        renderPosts(foundPosts)
      }
    });
}

const getPostsByUser = async () => {
  const userInfo = await getUserInfo()
  const userFirstName = userInfo.fName
  const userId = userInfo.id

  fetch("/posts/user/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  })
    .then((res) => res.json())
    .then(async (data) => {
      if (!data.ok) {
        console.log('err finding posts')
      } else {
        renderTitleFoundPostsUser(userFirstName)
        let foundPosts = data.foundPosts
        renderPosts(foundPosts)
      }
    });
}

const getPostsUserIdForAdmin = (params) => {
  const userId = params.split('=')[1];

  // let userInfo = await userInfoById(userId)
  fetch("/posts/admin/user/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.ok) {
        console.log('err finding posts')
      } else {
        const username = data.userInfo.username
        renderTitlePostForAdmin(username)
        let foundPosts = data.foundPosts
        renderPosts(foundPosts)
      }
    });
}
const getUserFavorites = async () => {
  let user = await getUserWhoPosted()
  const userId = user.id

  fetch("/posts/favorites/getall", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "unauthorized") {
        window.location.href = "index.html"
      } else {
        renderTitlePostFavorits()
        let foundPosts = data.favPosts
        renderPosts(foundPosts)
      }
    });
}
const checkHowMuchComments = async (postId) => {
  let comments
  await fetch("/comments/length", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "unauthorized") {
        window.location.href = "index.html"
      } else {
        comments = data.commentLength
      }
    });
  return comments
}


const renderPosts = async (postsArray) => {
  let userInfo = await getUserInfo()
  const userId = userInfo.id
  let isAdmin = false
  isAdmin = await handleCheckAdmin();

  postsArray.forEach((async post => {
    const isFavorite = await checkIfPostFavorite(post._id, userId)
    const commentsLength = await checkHowMuchComments(post._id)
    let isUsersPost = false

    const postCreatedTime = Date.parse(post.createdAt)
    const timeAgo = timeSince(postCreatedTime)

    if (post.publishedBy === userId) {
      isUsersPost = true
    }
    const html = buildOnePost(
      "post" /*post or comment*/,
      post.title,
      post.desc,
      post.img,
      postCreatedTime,
      timeAgo,
      "0",
      commentsLength,
      post._id,
      post.fName,
      post.lName,
      isFavorite
    )
    document.getElementById('app').innerHTML += html;

    if (isUsersPost || isAdmin) {
      document.getElementById(`${post._id}`).innerHTML =
        `<button class='deletePostButton' style="display:block;" onclick="handleDeletePost(event)">מחק פוסט</button>`
    }
  }))
}

