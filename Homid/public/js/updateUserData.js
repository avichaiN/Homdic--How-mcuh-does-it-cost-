fetch("/get-user-data")
  .then((r) => r.json())
  .then((data) => {
    console.log(data);
  });
