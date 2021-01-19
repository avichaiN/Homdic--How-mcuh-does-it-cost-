const checkUser = () =>{
    fetch('/isLoggedIn')
    .then(res => res.json())
    .then(data => {
        if(!data.user){
            window.location.replace('index.html')
        }
    })
}