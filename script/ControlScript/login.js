document.getElementById('submitBtn').addEventListener('click', () => {
    const user = document.getElementById('username');
    const pass = document.getElementById('password');
    const body = {
        'user':user,
        'pass':pass
    }
    request('POST', '/user/login', body).then(e => {
        if(e.status === 201){
            console.log(`login successfull!`);
        }
    })

});