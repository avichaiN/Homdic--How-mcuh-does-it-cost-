// const checkUser = () => {
//     fetch('/isLoggedIn')
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             if (!data.user) {
//                 window.location.replace('index.html')
//             } else {
//                 const name = data.userInfo.name
//                 sayHelloToUser(name)
//             }
//         })
// }
const handleLogout = () =>{
    fetch('/logout')
    .then(res => res.json())
    .then(data => {
        if(data.loggedout){
            window.location.replace('/index.html')
        }
    })
}