const renderNavToDom = () => {
  let html = "";
  html = `
  <div class="header__helloUser"></div>
      <form class="header__form" onsubmit="handleSearch(event)">
          <input class="header__formInput" placeholder='חפש פוסטים' type="text" required>
          <button class="header__formSubmit" type="submit"><i class="fa fa-search"></i></button>
      </form>
  
      <!-- user info / logout / edit user // show all posts -->
  
      <div class="header__userInfo">
      <h1 style="color:white;" class="fas fa-bars" onclick="showUserDropDown(event)"></h1>
      </div>
      <div  onclick="goBack()" class='goBack'>
      <span class="material-icons icon">
      keyboard_backspace
      </span>
      </div>`;

  let header = document.querySelector(".header");
  header.innerHTML = html;
  const url = window.location.href;
  const params = url.split("/")[3];
  if (params.includes("Categories")) {
    displayGoToAdminPage();
  }
  getUserInfo();
};
const getUserInfo = async () => {
  let user;
  await fetch("/userInfo")
    .then((res) => res.json())
    .then((data) => {
      if (!data.decoded) {
        window.location.href = "/index.html";
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
    document
      .querySelector(".header__adminPage")
      .setAttribute("style", "display:inherit");
  }
};

const showUserDropDown = (e) => {
  Swal.fire({
    confirmButtonText: "X",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    title: "<h3 style='color:#298cad;margin-bottom:0;'>תפריט</h3>",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    confirmButtonColor: "#247c99",
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    html:
      '<div class="menuItem"><a href="/Categories.html">קטגוריות</a></div>' +
      '<div class="menuItem"><a href="/posts.html?myposts">פוסטים שלי</a></div>' +
      '<div class="menuItem"><a href="/posts.html?myfavorites">מועדפים</a></div>' +
      '<div class="menuItem"><a href="/updateUserData.html">עדכן פרטי חשבון</a></div>' +
      '<button style="cursor: pointer;height:30px;margin-top:4px" onclick="handleLogout()">התנתק</button>',
  });
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
