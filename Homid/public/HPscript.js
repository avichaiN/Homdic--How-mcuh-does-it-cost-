let tab1 = document.getElementById('tab1')
let tab2 = document.getElementById('tab2')
let formSignIn = document.getElementById('form1')
let formSigneUp = document.getElementById('form2')
let formReset = document.getElementById('form3')
function showPageSignUp(e) {
    tab1.classList.remove('active')
    tab2.classList.add('active')
    formSignIn.style.display = "none"
    formSigneUp.style.display = "block"
    formReset.style.display = "none"
}
function showPageSignIn(e) {
    tab1.classList.add('active')
    tab2.classList.remove('active')
    formSignIn.style.display = "block"
    formSigneUp.style.display = "none"
    formReset.style.display = "none"
}
function showPageForgotPass(e) {
    formSignIn.style.display = "none"
    formReset.style.display = "block"
}