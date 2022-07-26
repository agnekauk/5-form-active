import { transferData, url, messages, messageDiv, getData } from './common.js';

document.querySelector('#login').addEventListener('click', () => {
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    let route = url + '/login';
    let method = 'POST';

    if (username === '' || password === '') {
        messageDiv.innerHTML = 'Not all the fields are filled';
        messageDiv.classList.add('show', 'danger');
        return
    };

    transferData(route, method, { username, password })
        .then(resp => {
            if (resp.status === 'success') {
                getData();
            }
            messages(resp.message, resp.status);
        });



});
