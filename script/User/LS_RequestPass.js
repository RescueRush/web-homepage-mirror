//document.getElementById("name").addEventListener("");

function submitSupportForm(event){
    event.preventDefault(); // Prevent the default form submission behavior
    const email = document.getElementById("name").value;
    request("POST", "/user/profile/request-pass-reset", {email: email})
}
