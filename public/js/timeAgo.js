async function timeSince(date) {
    let timeAgo
    await fetch("/posts/timeAgo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
    })
        .then((res) => res.json())
        .then((data) => {
            timeAgo = data.postedAgo
        })
    return timeAgo
}
