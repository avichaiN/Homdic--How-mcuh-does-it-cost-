
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
        
      });
  } else {
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