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

    className = e.srcElement.className
    const classNameInclude = className.includes('box')
    if (!classNameInclude) {
        postBox.style.opacity = '0'
        postBox.style.transform = 'rotate3d(1, .5, .5, 180deg) scale(0.1);'
        setTimeout(function () {
            postBox.style.display = 'none'
        }, 100);
    }
}
const getCategoiresCheckBox = () => {
    let categoriesNames = `<option selected hidden>בחר קטגוריוה</option>`
    fetch('/category')
        .then(res => res.json())
        .then(data => {
            let categories = data.categories
            categories.forEach(category => {
                categoriesNames += `<option data-id='${category._id}' value="${category.Name}">${category.Name}</option>`
            })
            categoryCheckBox.innerHTML = categoriesNames
        })
}