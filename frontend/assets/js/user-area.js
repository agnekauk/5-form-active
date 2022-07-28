import { transferData, url, messages } from './common.js';

const getData = () => {
    transferData(url)
        .then(response => {
            if (response.status === 'success') {
                let html = `<h1>You are inside!</h1>
                        <ul>List of clients`

                response.data.forEach(value => {
                    html += `<li data-id='${value.id}'>
                    <div>
                    <span>Company:</span> <p>${value.company.name}</p>
                    <span>Username:</span> <p>${value.name}</p>
                    </div>
                    <div>Contacts: 
                    <span>User email:</span> <p> ${value.email}</p>
                    <span>Phone:</span> <p> ${value.phone}</p>
                    </div>
                    </li>`
                })

                html += '</ul>'

                document.querySelector('.list').innerHTML = html;

                // document.querySelectorAll('.mark-done').forEach(element => {
                //     let id = element.parentElement.getAttribute('data-id');
                //     element.addEventListener('click', () => {

                //         transferData(url + '/mark-done/' + id, 'PUT')
                //             .then(resp => {
                //                 if (resp.status === 'success') {
                //                     getData();
                //                 }
                //                 messages(resp.message, resp.status);
                //             })

                //     })
                // })
                // document.querySelectorAll('.fa').forEach(element => {
                //     let id = element.parentElement.getAttribute('data-id');

                //     element.addEventListener('click', () => {
                //         transferData(url + '/' + id)
                //             .then(resp => {
                //                 if (resp.status === 'success') {
                //                     document.querySelector('#new-todo').value = resp.info.task;
                //                     addNewToDo.textContent = addNewToDo.getAttribute('data-edit-label');
                //                     addNewToDo.setAttribute('data-mode', 'edit');
                //                     addNewToDo.setAttribute('element-id', id);
                //                 }
                //             })
                //     })
                // })

                // document.querySelectorAll('.delete-todo').forEach(element => {
                //     let id = element.parentElement.getAttribute('data-id');

                //     element.addEventListener('click', () => {
                //         transferData(url + '/delete-todo/' + id, 'DELETE')
                //             .then(resp => {
                //                 getData();
                //                 messages(resp.message, resp.status);
                //             })
                //     })
                // })
            } else {
                messages(response.message, response.status);
            }
            // let count = response.data.length;
            // let tasksDone = 0;
            // response.data.forEach(element => {
            //     if (element.done === true) {
            //         tasksDone++;
            //     }
            // })
            // document.querySelector('.count').innerHTML = tasksDone + ' from ' + count + ' tasks done';
            // let percentage = (tasksDone / count * 100).toFixed(0);
            // document.querySelector('.bar').style.width = percentage + '%';
        })
};

window.addEventListener('load', () => {
    getData();
});

document.querySelector('.close').addEventListener('click', () => {

    let route = url + '/logout';
    let method = 'GET';

    transferData(route, method)
        .then(resp => {
            if (resp.status === 'success') {
                window.location.replace("/login/index.html");
            }
            // document.querySelector('#username').value = '';
            // document.querySelector('#password').value = '';
            messages(resp.message, resp.status);
        });
});