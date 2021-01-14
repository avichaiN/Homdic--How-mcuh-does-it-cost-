const handleNewCategory = (e) => {
    e.preventDefault()
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const email = document.getElementById('emailInput').value;
    console.log(username, password)

    fetch('/category/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

        })
}