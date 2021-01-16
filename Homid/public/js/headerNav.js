const showUserDropDown = (e) => {
    document.querySelector('.header__userInfoDrop').style.display = 'flex'
    e.stopPropagation();
}
const hideUserDropDown = () => {
    document.querySelector('.header__userInfoDrop').style.display = 'none'
}

//search bar

// hello user 