import { transferData, url, messages, messageDiv } from './common.js';

document.querySelector('#get-started').addEventListener('click', () => {
    let username = document.querySelector('#username').value;
    let email = document.querySelector('#email').value;
    let password1 = document.querySelector('#password').value;
    let password2 = document.querySelector('#re-pass').value;
    let password = '';

    if (password1 !== password2) {
        messageDiv.innerHTML = "Passwords are not the same!";
        messageDiv.classList.add('show', 'danger')
        return
    } else { password = password1 }

    let route = url + '/sign-up';
    let method = 'POST';

    if (username === '' || email === '' || password1 === '' || password2 === '') {
        document.querySelector.innerHTML = 'Not all the fields are filled';
        messageDiv.classList.add('show', 'danger');
        return
    }

    transferData(route, method, { username, email, password })
        .then(resp => {
            if (resp.status === 'success') {
                window.location.replace("/login/index.html");
            }
            messages(resp.message, resp.status);
        })
})
