//if admin display this.

const handleDisplayAddCategory = () => {
    document.querySelector(".category__adminAddCategoryForm").style.display = "block";
}
// handle new category ( admin )
const handleNewCategory = (e) => {
    e.preventDefault()
    const newCategoryName = document.getElementById('categoryInput').value;
    const newCategoryImg = document.getElementById('categoryInput').value;

    fetch('/category/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newCategoryName, newCategoryImg })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}

// button to show menu of edit or delete for amdin.
const showEditOrDeleteCategory = (e) => {
    document.querySelector('.deleteCategory').style.display = 'inline'
    document.querySelector('.editCategory').style.display = 'inline'
    e.stopPropagation();
}
// button to hide menu of edit or delete for amdin.
const hideEditOrDeleteCategory = () => {
    document.querySelector('.deleteCategory').style.display = 'none'
    document.querySelector('.editCategory').style.display = 'none'
}
//delete category
const deleteCategory = (e) => {
    e.stopPropagation();
    console.log(e.target.parentNode.dataset.id)
}
//edit category
const editCategory = (e) => {
    e.stopPropagation();
    console.log(e.target.parentNode.dataset.id)
    // add menu of edit category
}