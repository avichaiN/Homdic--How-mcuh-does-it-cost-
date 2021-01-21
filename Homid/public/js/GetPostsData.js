// get post data when for category
const getDisplayCategories = () => {
    fetch("/post/category/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "unauthorized") {
          window.location.replace("index.html");
        } else {
          let categories = data.categories;
          writeCategoiresToDom(categories);
        }
      });
  };