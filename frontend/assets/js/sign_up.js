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

    let mode = document.querySelector('#get-started').getAttribute('data-mode');

    let route = url + '/sign-up';
    let method = 'POST';

    if (username === '' || email === '' || password1 === '' || password2 === '') {
        messageDiv.innerHTML = 'Not all the fields are filled';
        messageDiv.classList.add('show');
        return
    }

    // if (mode == "edit") {

    //     let id = addNewToDo.getAttribute('element-id');

    //     route = url + '/edit/' + id;
    //     method = 'PUT';

    // }

    transferData(route, method, { username, email, password })
        .then(resp => {
            if (resp.status === 'success') {
                // getData();
            }
            document.querySelector('#username').value = '';
            document.querySelector('#email').value = '';
            document.querySelector('#password').value = '';
            document.querySelector('#re-pass').value = '';
            document.querySelector('#get-started').setAttribute('data-mode', 'add');
            // addNewToDo.textContent = addNewToDo.getAttribute('data-add-label');
            messages(resp.message, resp.status);
        })
})
