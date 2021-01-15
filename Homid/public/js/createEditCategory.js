//display add new category form (admim)

const handleDisplayAddCategory = () => {
    document.querySelector(".category__adminAddCategoryForm").style.display = "block";
}


// handle new category ( admin )
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