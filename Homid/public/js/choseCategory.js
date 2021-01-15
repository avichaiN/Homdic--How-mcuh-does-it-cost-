const showUserInfo = () => {
    document.querySelector('.cateogryPage__headerUserInfoShow').style.display = 'none'
    document.querySelector('.cateogryPage__headerUserInfoDrop').style.display = 'flex'
}
const hideUserInfo = () => {
    document.querySelector('.cateogryPage__headerUserInfoShow').style.display = 'block'
    document.querySelector('.cateogryPage__headerUserInfoDrop').style.display = 'none'
}