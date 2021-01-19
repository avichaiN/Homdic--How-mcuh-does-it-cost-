const sayHelloToUser = (name) =>{
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
    if(searched.length > 2){
        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searched })
        })
            .then(res => res.json())
            .then(data => {
                sessionStorage.setItem("keywords", data.searchClean);
                window.location.replace(`/search.html`)
            })
    }else{
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
                if(!data.ok){
                    console.log('no posts found')
                }else{
                    console.log(data.posts)
                }
            })
    }
}


// hello user 