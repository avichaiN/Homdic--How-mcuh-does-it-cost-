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


    fetch('/category/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searched })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.searchRes)
            
        })
}


const test = () =>{
    fetch('/category/createrandompost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}


// hello user 