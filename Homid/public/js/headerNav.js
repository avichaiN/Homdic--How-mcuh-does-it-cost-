const renderNavToDom = () => {
    let html = ''
    html = `<div class="header__helloUser"></div>
    <a href="/adminPage.html" class="header__adminPage">דף אדמין</a>
    <form class="header__form" onsubmit="handleSearch(event)">
        <input class="header__formInput" placeholder='חפש פוסטים' type="text" required>
        <!-- <input class="header__formSubmit" type="submit" value="חפש"> -->
        <button class="header__formSubmit" type="submit"><i class="fa fa-search"></i></button>
    </form>

    <!-- user info / logout / edit user // show all posts -->

    <div class="header__userInfo">
        <img onclick="showUserDropDown(event)"
            src="https://icon-library.com/images/menu-icon-png-3-lines/menu-icon-png-3-lines-5.jpg">
        <div class="header__userInfoDrop">
            <a href="/Categories.html">קטגוריות</a>
            <a href="#">פוסטים שלי</a>
            <a href="#">מועדפים</a>
            <a href="/updateUserData.html">עדכן פרטי חשבון</a>
            <button onclick="handleLogout()">התנתק</button>
        </div>
    </div>`

    let header = document.querySelector('.header')
    header.innerHTML = html
    getUserInfo(),
    displayGoToAdminPage()
}
const getUserInfo = () => {
    fetch("/userInfo")
        .then((res) => res.json())
        .then((data) => {
            const name = data.decoded.name;
            sayHelloToUser(name);
        });
};
const sayHelloToUser = (name) => {
    const myDate = new Date();
    const hrs = myDate.getHours();
    let greet;
    let sayHello = document.querySelector('.header__helloUser')

    if (hrs < 12)
        greet = 'בוקר טוב';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'צהרים טובים';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'ערב טוב';

    sayHello.innerHTML = `${greet}, ${name}`
}

const displayGoToAdminPage = async () => {
    let checkAdmin = await handleCheckAdmin()

    if (checkAdmin) {
        document.querySelector('.header__adminPage').style.display = 'block'
    }
}
const showUserDropDown = (e) => {
    document.querySelector('.header__userInfoDrop').style.display = 'flex'
    e.stopPropagation();
}
const hideUserDropDown = () => {
    document.querySelector('.header__userInfoDrop').style.display = 'none'
}



//search bar
const handleSearch = (e) => {
    e.preventDefault()
    const searched = document.querySelector('.header__formInput').value
    if (searched.length > 2) {
        fetch('/posts/search/getPostsId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searched })
        })
            .then(res => res.json())
            .then(data => {
                const postsId = data.postsId
                const postsIdString = postsId.toString()
                console.log(postsIdString)

                // window.location.replace(`/posts/search/${postsId}`)
            })
    } else {
        document.querySelector('.header__formInput').value = ""
        document.querySelector('.header__formInput').placeholder = "חיפוש חייב להיות מעל 2 תווים"
    }
}

const getSearchedPosts = () => {
    const keywords = sessionStorage.getItem("keywords");
    document.querySelector('.header__formInput').value = keywords

    if (keywords === '') {
        console.log('no posts found')
    } else {
        fetch(`/search/${keywords}`)
            .then(res => res.json())
            .then(data => {
                if (!data.ok) {
                    console.log('no posts found')
                } else {
                    console.log(data.posts)
                }
            })
    }
}


// hello user 