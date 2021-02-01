const renderNavToDom = () => {
  let html = "";
  html = `<div class="header__helloUser"></div>
  <a href="/adminPage.html" class="header__adminPage">אדמין</a>
      <form class="header__form" onsubmit="handleSearch(event)">
          <input class="header__formInput" placeholder='חפש פוסטים' type="text" required>
          <!-- <input class="header__formSubmit" type="submit" value="חפש"> -->
          <button class="header__formSubmit" type="submit"><i class="fa fa-search"></i></button>
      </form>
      
  
      <!-- user info / logout / edit user // show all posts -->
      
      <div class="header__userInfo">
          <h1 class="fas fa-bars" onclick="showUserDropDown(event)"></h1>
              <div class="header__userInfoDrop">
              <a href="/Categories.html">קטגוריות</a>
              <a href="/posts.html?myposts">פוסטים שלי</a>
              <a href="/posts.html?myfavorites">מועדפים</a>
              <a href="/updateUserData.html">עדכן פרטי חשבון</a>
              <button onclick="handleLogout()">התנתק</button>
          </div>
      </div>
      <div  onclick="goBack()" class='goBack'>
      <span class="material-icons icon">
      keyboard_backspace
      </span>
      </div>`;

  let header = document.querySelector(".header");
  header.innerHTML = html;
  getUserInfo(), displayGoToAdminPage();
};
const getUserInfo = async () => {
  let user;
  await fetch("/userInfo")
    .then((res) => res.json())
    .then((data) => {
      if (!data.decoded) {
        window.location.href = '/index.html'
      }

      const name = data.decoded.fName;
      sayHelloToUser(name);
      user = data.decoded;
    });
  return user;
};
const sayHelloToUser = (name) => {
  const myDate = new Date();
  const hrs = myDate.getHours();
  let greet;
  let sayHello = document.querySelector(".header__helloUser");

  if (hrs < 12 && hrs > 4) greet = "בוקר טוב";
  else if (hrs >= 12 && hrs <= 16) greet = "צהרים טובים";
  else if (hrs >= 16 && hrs <= 24) greet = "ערב טוב";
  else if (hrs <= 4) greet = "לילה טוב";
  sayHello.innerHTML = `${greet}, ${name}`;
};

const displayGoToAdminPage = async () => {
  let checkAdmin = await handleCheckAdmin();

  if (checkAdmin) {
    document.querySelector(".header__adminPage").style.display = "block";
  }
};
const showUserDropDown = (e) => {
  document.querySelector(".header__userInfoDrop").style.display = "flex";
  e.stopPropagation();
};
const hideUserDropDown = () => {
  document.querySelector(".header__userInfoDrop").style.display = "none";
};

//search bar
const handleSearch = (e) => {
  e.preventDefault();
  const searched = document.querySelector(".header__formInput").value;
  if (searched.length > 2) {
    let searchedSep = searched.replace(/\s/g, "-");
    window.location.href = `/posts.html?search?${searchedSep}`;
  } else {
    document.querySelector(".header__formInput").value = "";
    document.querySelector(".header__formInput").placeholder =
      "חיפוש חייב להיות מעל 2 תווים";
  }
};

function goBack() {
  window.history.back();
}
