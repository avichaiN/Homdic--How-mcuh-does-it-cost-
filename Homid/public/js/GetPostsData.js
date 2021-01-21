// get post data when for category
// const getDisplayCategories = () => {
//   fetch("/posts/category/get")
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.status === "unauthorized") {
//         window.location.replace("index.html");
//       } else {
//         let categories = data.categories;
//         writeCategoiresToDom(categories);
//       }
//     });
// };

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
      });
  }

}