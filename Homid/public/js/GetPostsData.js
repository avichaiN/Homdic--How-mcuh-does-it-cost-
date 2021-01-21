
const getPostsByIdInParams = () => {

  const url = window.location.href
  const categoryId = url.split('/')[4];

  if (categoryId === 'search') {

    // this is when user search keywords
    const searchedPosts = url.split('/')[5];
    fetch(`/posts/search/get/${searchedPosts}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.foundPostsBySearch)
        data.foundPostsBySearch.forEach((post=>{
          console.log(post)
          const html = buildOnePost(
             "post" /*post or comment*/,
             post[0].title,
             post[0].desc,
             post[0].Img,
             "0",
             post._id
           )
           document.getElementById('app').innerHTML += html;
         console.log('test')
         }))
      });
  } else {

    fetch("/category/byid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        renderPostsHeder(data.categoryInfo[0].Name,data.categoryInfo[0].Img);
      });




    // this is when looking for category id
    fetch(`/posts/get/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.foundPostsByCategoryId)
        data.foundPostsByCategoryId.forEach((post=>{
         const html = buildOnePost(
            "post" /*post or comment*/,
            post.title,
            post.desc,
            post.Img,
            "0",
            post._id
          )
          document.getElementById('app').innerHTML += html;
        console.log('test')
        }))
       
      });
  }

}