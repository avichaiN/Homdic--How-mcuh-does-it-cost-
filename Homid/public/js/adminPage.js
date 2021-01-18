const getAllUsers = () => {
    fetch('/admin')
        .then(res => res.json())
        .then(data => {
            console.log(data.allUsers)
            writeUsersToDom(data.allUsers)
        })
}

const writeUsersToDom = (users) => {
    let usersBox = document.querySelector('.allUsers')
    let html = ''
    users.forEach(user => {
        html += `<div data-id='${user._id}' data-email='${user.email}' data-username='${user.username}' data-fn='${user.firstName}' data-ln='${user.lastName}', data-role='${user.role}' class="user">
        <label>שם משתמש: ${user.username}</label>
        <label>איימל: ${user.email}</label>
        <label>שם פרטי: ${user.firstName}</label>
        <label>שם משפחה: ${user.lastName}</label>
        <label>תפקיד: ${user.role}</label>
        <label>תאריך יצירת משתמש: ${user.createdAt}</label>
        <button onclick='handleOpenEditUser(event)'>ערוך</button>
        <button onclick='handleDeleteUser(event)'>מחק</button>

    </div>`
    })
    usersBox.innerHTML = html
}
const handleDeleteUser = (e) => {

    const userId = e.target.parentNode.dataset.id
    const username = e.target.parentNode.dataset.username

    const areYouSure = confirm(`Are you sure you want to delete User: ${username}`);
    if (areYouSure == true) {
        fetch('/admin', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.allUsers)
                writeUsersToDom(data.allUsers)
            })
    }
}
const handleOpenEditUser = (e) => {
    const username = e.target.parentNode.dataset.username
    const email = e.target.parentNode.dataset.email
    const firstName = e.target.parentNode.dataset.fn
    const lastName = e.target.parentNode.dataset.ln
    const role = e.target.parentNode.dataset.role
    const id = e.target.parentNode.dataset.id



    document.querySelector('.editUserForm').style.display = 'block'
    let html = document.querySelector('.editUserForm')
    html.innerHTML = `<form class="editUserFormm" onsubmit="handleEditUser(event, '${username}','${email}','${firstName}','${lastName}','${id}')">

        <label>משתמש שאתה עורך:</label>
            <label>שם משתמש: ${username}</label>
            <label>איימל: ${email}</label>
            <label>שם פרטי: ${firstName}</label>
            <label>שם משפחה: ${lastName}</label>
            <label>תפקיד: ${role}</label>
            <label>משתנה שישאר ריק ישמור את הערך הישן</label>
        <input type="text" name="username" placeholder="שם משתמש">
        <input type="email" name="email" placeholder="איימל">
        <input type="text" name="firstName" placeholder="שם פרטי">
        <input type="text" name="lastName" placeholder="שם משפחה">
        <select id="role" name="role">
        <option value="public">Public</option>
        <option value="admin">Admin</option>
      </select>
        <input type="submit" value="ערוך משתמש">
    </form>
    <button onclick='hideEditForm()'>בטל</button>`
}
const hideEditForm = () => {
    document.querySelector('.editUserForm').style.display = 'none'
}
const handleEditUser = (e, username, email, firstName, lastName, id) => {
    e.preventDefault()
    // console.log(username, email, firstName, lastName, role)
    let newEmail = e.target.children.email.value
    let newfName = e.target.children.firstName.value
    let newlName = e.target.children.lastName.value
    let newUsername = e.target.children.username.value
    let newRole = e.target.children.role.selectedIndex

    if (newRole === 0) {
        newRole = 'public'
    } else if (newRole === 1) {
        newRole = 'admin'
    }

    if (newUsername === '') {
        newUsername = username
    } else if (newUsername.length < 3) {
        newUsername = username
    }

    if (newEmail === '') {
        newEmail = email
    }
    if (newfName === '') {
        newfName = firstName
    }
    if (newlName === '') {
        newlName = lastName
    }

    fetch('/admin', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newEmail,newUsername,newfName,newlName,newRole,id })
    })
        .then(res => res.json())
        .then(data => {
            hideEditForm()
            writeUsersToDom(data.allUsers)
        })
}