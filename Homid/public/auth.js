const handleRegister = (e) => {
    e.preventDefault()
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const email = document.getElementById('emailInput').value;
    console.log(username, password)
}
const handleLogin = (e) => {
    e.preventDefault()
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    console.log(username, password)
}