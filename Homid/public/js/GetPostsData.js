
const getPostsByIdInParams = () => {

  const url = window.location.href
  const categoryId = url.split('?')[1];

  if (categoryId === 'search') {

    // this is when user search keywords
    const searchedPosts = url.split('?')[2];

    fetch(`/posts/search/get/${searchedPosts}`)
      .then((res) => res.json())
      .then((data) => {
        let keywords = data.searchedSplitted
        let foundPosts = data.foundPosts
        if (data.status === "unauthorized") {
          window.location.href = "index.html"
        } else {

          if (foundPosts.length == 0) {
            noPostsFound(keywords)
          } else {
            postsFoundTitle(keywords)
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
  } else {

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

}