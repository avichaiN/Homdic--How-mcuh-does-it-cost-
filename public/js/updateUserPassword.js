function getUserName() {
  const encodedId = window.location.href.replace(
    "http://localhost:3000/updateUserPassword.html?",
    ""
  );
  fetch("/resetpassword/getusername", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ encodedId }),
  })
    .then((res) => res.json())
    .then((data) => {
      try {
        if (data.user) {
          const title = (document.getElementById(
            "firstName"
          ).innerHTML = `<h2>שלום לך  ${data.user}</h2>`);
        } else {
          console.log("can't get first name");
        }
      } catch (e) {
        console.log(e);
      }
    });
}

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
    .then(async (data) => {
      try {
        if (data.user == "updated") {
          await Swal.fire({
            position: "top-center",
            icon: "success",
            title: "פרטייך עודכנו במערכת, הנך מועבר/ת לאתר..",
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
      } catch (e) {
        console.log(e);
      }
    });
}
