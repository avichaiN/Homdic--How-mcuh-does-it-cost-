// get all categories when loading page
const getDisplayCategories = () => {
    fetch('/category')
        .then(res => res.json())
        .then(data => {
            let categories = data.categories
            console.log(categories)
            writeCategoiresToDom(categories)
        })
}
const writeCategoiresToDom = (categories) =>{
    const categoryDiv = document.querySelector('.cateogryPage__categorys')
    let categoriesHtml = ''

    categories.forEach(category=>{
        categoriesHtml += `<div onclick="goToClickedCategory(event)" class="cateogryPage__categorysBox" data-name='${category.Name}' data-id='${category._id}'>
        <img src="${category.Img}">
        <div class="cateogryPage__categorysBoxContainer" data-img='${category.Img}' data-name='${category.Name}' data-id='${category._id}'>
            <p>${category.Name}</p>
            <button onclick='deleteCategory(event)' style="display: none;" class="deleteCategory">מחק</button>
            <!-- add menu of edit cateogry -->
            <button onclick='editCategoryForm(event)' style="display: none;" class="editCategory">ערוך</button>
        </div>
    </div>`
    })
    categoryDiv.innerHTML = categoriesHtml
}
// go to clicked category
const goToClickedCategory = (e) =>{
    let chosenCategoryId = e.target.dataset.id
    if(chosenCategoryId===undefined){
        chosenCategoryId=e.target.parentNode.dataset.id
    }
    console.log(chosenCategoryId)
}