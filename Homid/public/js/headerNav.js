const showUserDropDown = (e) => {
    document.querySelector('.header__userInfoDrop').style.display = 'flex'
    e.stopPropagation();
}
const hideUserDropDown = () => {
    document.querySelector('.header__userInfoDrop').style.display = 'none'
}

//search bar

const handleSearch = (e) =>{
    e.preventDefault()
    const searched = document.querySelector('.header__formInput').value


    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searched })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // sessionStorage.setItem("postsId", data.postsId);
            // window.location.replace('/search.html')
            // window.location.replace(`/search/${data.postsId}`)
        })
}
const getSearchedPosts = () =>{
    var postsId = sessionStorage.getItem("postsId");

    fetch(`/search/${postsId}`)
        .then(res => res.json())
        .then(data => {
            if(data.foundPosts === undefined || data.foundPosts===null){
                console.log('NO POSTS FOUND')
            }else{
                console.log(data.foundPosts)
            }
        })
}


// hello user 