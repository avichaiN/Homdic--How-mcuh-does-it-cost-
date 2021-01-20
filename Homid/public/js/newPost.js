let postBox = document.querySelector('.newPostBox')
let categoryCheckBox = document.getElementById('category')


const displayPostBox = (e) => {
    e.stopPropagation();
    postBox.style.display = 'block'
    setTimeout(function () {
        postBox.style.opacity = '1'
        postBox.style.transform = 'none'
        getCategoiresCheckBox()

    }, 100);
}

document.onclick = function (e) {

    className = e.target.className
    const classNameInclude = className.includes('box')
    if (!classNameInclude) {
        postBox.style.opacity = '0'
        postBox.style.transform = 'rotate3d(1, .5, .5, 180deg) scale(0.1)'
        setTimeout(function () {
            postBox.style.display = 'none'
        }, 100);
    }
}
const getCategoiresCheckBox = () => {
    let categoriesNames = `<option selected hidden>בחר קטגוריוה</option>`
    fetch('/category/get')
        .then(res => res.json())
        .then(data => {
            let categories = data.categories
            categories.forEach(category => {
                categoriesNames += `<option data-id='${category._id}' value="${category.Name}">${category.Name}</option>`
            })
            categoryCheckBox.innerHTML = categoriesNames
        })
}
const handleNewPost = (e) =>{
    e.preventDefault()
    console.log(e)
    const category = e.target.children.category.value
    const title =  e.target.children.title.value
    const desc = e.target.children.desc.value
    const img = e.target.children.img.value
    console.log(category,title,desc,img)
}