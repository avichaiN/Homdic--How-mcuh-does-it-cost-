const handleCheckAdmin = async () => {
    let admin = false
    await fetch('/admin/check')
        .then(res => res.json())
        .then(data => {

            if (data.admin) {
                admin = true
            } else {
                admin = false
            }
        })
    return admin
}

const getUserInfo = () => {
    fetch('/userInfo')
    .then(res => res.json())
    .then(data => {
        const name = data.name
        sayHelloToUser(name)
    })
}

const handleLogout = () =>{
    fetch('/logout')
    .then(res => res.json())
    .then(data => {
        if(data.loggedout){
            window.location.replace('/index.html')
        }
    })
}