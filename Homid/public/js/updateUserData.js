fetch("/updateUserData")
  .then((r) => r.json())
  .then((data) => {
    console.log(data);
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
  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, username, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == "unauthorized") {
        Swal.fire({
          icon: "error",
          title: "אופס...",
          text: "כנראה שהפרטים שהזנת לא נכונים או קיימים במערכת, נסה שנית",
          confirmButtonColor: "red",
          confirmButtonText: "אישור",
        });
      } else {
        window.location.href = "/";
      }
    });
}
