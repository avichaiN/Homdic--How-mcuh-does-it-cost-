const handleNewCategory = (e) => {
    e.preventDefault()
    const newCategory = document.getElementById('categoryInput').value;

    fetch('/category/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newCategory })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}