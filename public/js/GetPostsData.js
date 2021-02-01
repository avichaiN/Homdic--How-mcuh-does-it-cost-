let canLoadMore = false
const getPosts = () => {
  document.querySelector("#categoryHeder").style.visibility = "hidden";
  document.querySelector("#app").style.visibility = "hidden";
  document.querySelector("#loader").style.visibility = "visible";
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
    skipLimitPostsCategory(params, 0)
    // getPostsByCategory(params, 0)
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
const getPostsByCategory = async (categoryId) => {

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
      renderPostsHeder(data.categoryInfo[0].Name, data.categoryInfo[0].img);
    });

  let foundPosts
  // this is when looking for category id
  await fetch(`/posts/get/${categoryId}`)
    .then((res) => res.json())
    .then(async (data) => {
      if (data.status === "unauthorized") {
        window.location.href = "index.html"
      } else {
        foundPosts = data.foundPostsByCategoryId
      }
    });
  return foundPosts
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
      if (data.status === "unauthorized") {
        window.location.href = "index.html"
      } else {
        if (!data.ok) {
          console.log('err finding posts')
        } else {
          renderTitleFoundPostsUser(userFirstName)
          let foundPosts = data.foundPosts
          renderPosts(foundPosts)
        }
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
        const postsToDom = []
        renderTitlePostFavorits()
        let foundPosts = data.favPosts
        foundPosts.forEach(post => {
          postsToDom.push(post[0])
        })
        renderPosts(postsToDom)

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

  const sortedPosts = postsArray
  // .reverse()

  for (i = 0; i < sortedPosts.length; i++) {
    const isFavorite = await checkIfPostFavorite(sortedPosts[i]._id, userId)
    const commentsLength = await checkHowMuchComments(sortedPosts[i]._id)
    let isUsersPost = false

    const postCreatedTime = Date.parse(sortedPosts[i].createdAt)
    const timeAgo = timeSince(postCreatedTime)

    if (sortedPosts[i].publishedBy === userId) {
      isUsersPost = true
    }

    const html = buildOnePost(
      "post" /*post or comment*/,
      sortedPosts[i].title,
      sortedPosts[i].desc,
      sortedPosts[i].img,
      postCreatedTime,
      timeAgo,
      "0",
      commentsLength,
      sortedPosts[i]._id,
      sortedPosts[i].fName,
      sortedPosts[i].lName,
      isFavorite
    )
    document.getElementById('app').innerHTML += html;
    if (isUsersPost || isAdmin) {
      document.getElementById(`${sortedPosts[i]._id}`).innerHTML =
        `<button class='deletePostButton' style="display:block;" onclick="handleDeletePost(event)">מחק פוסט</button>`
    }
  }
  document.querySelector(
    "#loader").style.display = "none";
  document.querySelector("#categoryHeder").style.visibility = "visible";
  document.querySelector("#app").style.visibility = "visible";

  setTimeout(function () {
    canLoadMore = true
  }, 1000)
}


// getPostsByCategory
const getCurrentCategory = () => {
  const url = window.location.href
  const categoryId = url.split('?')[1];
  return categoryId
}
const skipLimitPostsCategory = async (categoryId, skip) => {
  setTimeout(function () { blockLoadMore = false;}, 2000);
  let foundPosts = await getPostsByCategory(categoryId)
  foundPosts.reverse()
  let sortedPosts = foundPosts.slice(skip, skip + 10)
  renderPosts(sortedPosts)
}
let blockLoadMore = false
const something = (function () {
  return function (currentCategory, howMuchToSkip) {
    if (!blockLoadMore) {
      blockLoadMore = true
      skipLimitPostsCategory(currentCategory, howMuchToSkip)

    }
  }
})()

window.onscroll = function (ev) {
  const url = window.location.href
  const checkIfCategoryPage = url.split('/')[3]

  if (!checkIfCategoryPage.includes('myfavorites') && !checkIfCategoryPage.includes('myposts') && !checkIfCategoryPage.includes('admin')) {
    if (canLoadMore) {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        const howMuchToSkip = document.getElementsByClassName('post').length
        const currentCategory = getCurrentCategory()
        something(currentCategory, howMuchToSkip)
      }
    }
  }
};