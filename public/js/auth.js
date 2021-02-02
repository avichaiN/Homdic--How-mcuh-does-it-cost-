const handleCheckAdmin = async () => {
  let admin = false;
  await fetch("/admin/check")
    .then((res) => res.json())
    .then((data) => {
      if (data.admin) {
        admin = true;
      } else {
        admin = false;
      }
    });
  return admin;
};
const getUserWhoPosted = async () => {
  let user = ''
  await fetch("/userInfo")
    .then((res) => res.json())
    .then((data) => {
      user = data.decoded
    });
  return user
};
const handleLogout = () => {
  fetch("/", {
    method: "delete",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.loggedout) {
        window.location.href = "/index.html"
      }
    });
};
