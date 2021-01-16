// get all categories when loading page
const getCategories = () => {
    fetch('/category')
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}

// go to clicked category
const goToClickedCategory = (e) =>{
    let chosenCategoryId = e.target.dataset.id
    if(chosenCategoryId===undefined){
        chosenCategoryId=e.target.parentNode.dataset.id
    }
    console.log(chosenCategoryId)
}