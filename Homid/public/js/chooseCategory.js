const getCategories = () => {
    fetch('/category')
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}