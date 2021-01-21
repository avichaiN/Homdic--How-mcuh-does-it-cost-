"use strict";

var getPostsByIdInParams = function getPostsByIdInParams() {
  var url = window.location.href;
  var categoryId = url.split('/')[4];

  if (categoryId === 'search') {
    // this is when user search keywords
    var searchedPosts = url.split('/')[5];
    fetch("/posts/search/get/".concat(searchedPosts)).then(function (res) {
      return res.json();
    }).then(function (data) {
      console.log(data.foundPostsBySearch);
    });
  } else {
    fetch("/category/byid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        categoryId: categoryId
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      console.log(data);
      renderPostsHeder(data.categoryInfo[0].Name, data.categoryInfo[0].Img);
    }); // this is when looking for category id

    fetch("/posts/get/".concat(categoryId)).then(function (res) {
      return res.json();
    }).then(function (data) {
      console.log(data.foundPostsByCategoryId);
      data.foundPostsByCategoryId.forEach(function (post) {
        var html = buildOnePost("post"
        /*post or comment*/
        , post.title, post.desc, post.Img, "0", post._id);
        document.getElementById('app').innerHTML += html;
        console.log('test');
      });
    });
  }
};