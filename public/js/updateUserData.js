fetch("/updateUserData")
  .then((r) => r.json())
  .then((data) => {
    document
      .getElementById("firstName")
      .setAttribute("value", `${data.userFound.firstName}`);
    document
      .getElementById("lastName")
      .setAttribute("value", `${data.userFound.lastName}`);
    document
      .getElementById("username")
      .setAttribute("value", `${data.userFound.username}`);
    document
      .getElementById("email")
      .setAttribute("value", `${data.userFound.email}`);
  });

function handleUpdateForm(e) {
  e.preventDefault();
  const firstName = e.target.children.firstName.value;
  const lastName = e.target.children.lastName.value;
  const username = e.target.children.username.value;
  const email = e.target.children.email.value;

  fetch("/updateUserData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, username, email }),
  })
    .then((res) => res.json())
    .then(async (data) => {
      if (data.user == "updated") {
        await Swal.fire({
          position: "top-center",
          icon: "success",
          title: "פרטייך עודכנו במערכת",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = "/category";
      } else {
        Swal.fire({
          icon: "error",
          title: "אופס...",
          text: "משהו השתבש בעדכון הפרטים, נא לנסות שוב..",
          confirmButtonColor: "red",
          confirmButtonText: "אישור",
        });
      }
    });
}
