const getUserFavorites = async () => {
    let user = await getUserWhoPosted()
    const userId = user.id


    fetch("/posts/favorites/getall", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === "unauthorized") {
                window.location.href = "index.html"
            } else {
                console.log(data.favPosts);
            }
        });
}