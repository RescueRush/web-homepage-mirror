document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is fully loaded and parsed!");

    request("GET", "/user/leaderboard/single")
        .catch(error => {
            // TODO: Popup or something
            console.error("Error:", error);
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            updateSelfLeaderboard(data);
        });


    request("GET", "/user/leaderboard/list", { page: 0 })
        .catch(error => {
            // TODO: Popup or something
            console.error("Error:", error);
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            updateListLeaderboard(data);
        });
});

function updateListLeaderboard(data) {
    for (let i = 1; i <= 5; i++) {
        if (document.querySelector('#top' + i) != null) {
            if (data.length < i) {
                document.querySelector('#usern' + i + 'score').textContent = "?";
                document.querySelector('#usern' + i).textContent = "...";
            } else {
                document.querySelector('#usern' + i + 'score').textContent = data[i - 1].points;
                document.querySelector('#usern' + i).textContent = data[i - 1].username;
            }

        }
    }
}

function updateSelfLeaderboard(data) {
    // document.querySelector("#profile > #personalinfo > #userpersonalname").textContent = data
    document.querySelector("#userrank").textContent = data.position == -1 ? "?" : data.position;
    document.querySelector("#username").textContent = data.username;
    document.querySelector("#userdate").textContent = formatDate(data.joinDate);
    //document.querySelector("#profile > #userscore > #value").textContent = data.points;
}

