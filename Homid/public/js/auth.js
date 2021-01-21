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


const handleLogout = () => {
  fetch("/logout/user")
    .then((res) => res.json())
    .then((data) => {
      if (data.loggedout) {
        window.location.replace("/index.html");
      }
    });
};
