
const getPosts = () => {

  const url = window.location.href
  const params = url.split('?')[1];

  if (params === 'search') {
    const searchedPosts = url.split('?')[2];
    getPostsBySearch(searchedPosts)
  } else if (params === 'myposts') {
    getPostsByUser()
  }else if (params.includes('admin')){
    getPostsUserIdForAdmin(params)
  }else {
    getPostsByCategory(params)
  }
};

const getPostsBySearch = (searchedPosts) => {
  fetch(`/posts/search/get/${searchedPosts}`)
    .then((res) => res.json())
    .then((data) => {
      let keywords = data.searchedSplitted
      let foundPosts = data.foundPosts
      if (data.status === "unauthorized") {
        window.location.href = "index.html"
      } else {

        if (foundPosts.length == 0) {
          renderNoPostsFound(keywords)
        } else {
          renderSearchedPostsTitle(keywords)
          foundPosts.forEach((post => {

            const html = buildOnePost(
              "post" /*post or comment*/,
              post.title,
              post.desc,
              post.img,
              "0",
              post._id
            )
            document.getElementById('app').innerHTML += html;
          }))
        }
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
    .then((data) => {
      if (data.status === "unauthorized") {
        window.location.href = "index.html"
      } else {

        data.foundPostsByCategoryId.forEach((post => {
          const html = buildOnePost(
            "post" /*post or comment*/,
            post.title,
            post.desc,
            post.img,
            "0",
            post._id
          )
          document.getElementById('app').innerHTML += html;
        }))
      }
    });
}
const getPostsByUser = async () => {
  const userInfo = await getUserInfo()
  const userFirstName = userInfo.name
  const userId = userInfo.id

  fetch("/posts/user/get", {
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
        renderTitleFoundPostsUser(userFirstName)
        data.foundPosts.forEach((post => {
          const html = buildOnePost(
            "post" /*post or comment*/,
            post.title,
            post.desc,
            post.img,
            "0",
            post._id
          )
          document.getElementById('app').innerHTML += html;
        }))
      }
    });
}

const getPostsUserIdForAdmin = (params) =>{
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
        data.foundPosts.forEach((post => {
          const html = buildOnePost(
            "post" /*post or comment*/,
            post.title,
            post.desc,
            post.img,
            "0",
            post._id
          )
          document.getElementById('app').innerHTML += html;
        }))
      }
    });
}