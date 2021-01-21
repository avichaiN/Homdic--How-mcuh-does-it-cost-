// fetch("/")
//   .then((r) => r.json())
//   .then((data) => {
//     console.log(data);
//     // const firtName = (document.getElementById(
//     //   "firstName"
//     // ).innerHTML = `<h2>ברוך הבא, ${data.user}</h2>`);
//   });

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
      if (data.user == "updated") {
        await Swal.fire({
          position: "top-center",
          icon: "success",
          title: "פרטייך עודכנו במערכת, הנך מועבר/ת לאתר..",
          showConfirmButton: false,
          timer: 1000,
        });
        window.location.replace("/category");
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
