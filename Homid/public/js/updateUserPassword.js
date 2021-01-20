fetch("/:id")
  .then((r) => r.json())
  .then((data) => {
    const firtName = (document.getElementById(
      "firstName"
    ).innerHTML = `<h2>ברוך הבא, ${data.user}</h2>`);
  });

function handleUpdatePassword(e) {
  e.preventDefault();
  const newPassword = e.target.children.password.value;

  fetch("/resetpassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
