const showUserDropDown = (e) => {
    document.querySelector('.cateogryPage__headerUserInfoDrop').style.display = 'flex'
    e.stopPropagation();
}
const hideUserDropDown = () => {
    document.querySelector('.cateogryPage__headerUserInfoDrop').style.display = 'none'
}
