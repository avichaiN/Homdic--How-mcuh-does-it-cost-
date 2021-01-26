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
            console.log(data.favPosts);
        });
}