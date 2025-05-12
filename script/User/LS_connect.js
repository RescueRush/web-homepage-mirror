async function loginRaw(username, password) {
    return login(username, await hashPass(password))
}

async function login(username, password) {
    const response = await request("POST", "/user/login", { user: username, pass: password });
    
    if (response.ok) {
        console.log('Login successful!');
        window.location.assign("/game/menu/");
        return true;
    } else {
        const data = await response.json();
        console.log(data);

        let return_status = document.getElementById("reason-status");
        if(!return_status) {
            console.error("no return status element");
        }else {
            console.log(response);
            if (response.status == 404) {
                return_status.textContent = "Wrong username/password";
            } else if (response.status == 403) {
                return_status.textContent = "This account was restricted.";
            } else  {
                return_status.textContent = data.error + " (" + response.status + ")";
            }
        }

        console.error('Login failed:', response.status, response.error);
        return false;
    }
}