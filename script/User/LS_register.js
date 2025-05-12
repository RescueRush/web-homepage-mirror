async function registerRaw(email, username, password) {
    return register(email, username, await hashPass(password))
}

async function register(email, username, password) {
    const response = await request("POST", "/user/logon", { user: username, pass: password, email: email, lang: getCurrentLanguage() });
    
    if (response.ok) {
        console.log('Register successful !');
        window.location.assign("/game/menu/");
        return true;
    } else {
        const data = await response.json();
        console.log(data);

        let return_status = document.getElementById("reason-status");
        if(!return_status) {
            console.error("no return status element");
        }else {
            if (response.status == 404) {
                return_status.textContent = "Wrong username/password";
            } else {
                return_status.textContent = data.error + " (" + response.status + ")";
            }
        }

        console.error('Login failed:', response.status, response.error);
        return false;
    }
}