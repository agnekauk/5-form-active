const url = 'http://localhost:5004';
const messageDiv = document.querySelector('.messages');

const messages = (message, status) => {
    let klase = (status === 'success') ? 'success' : 'danger';
    messageDiv.innerHTML = message;
    messageDiv.classList.remove('success', 'danger');
    messageDiv.classList.add('show', klase);
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 8000)
}

const transferData = async (url, method = 'GET', data = []) => {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (method != 'GET') {
        options.body = JSON.stringify(data);
    };

    const resp = await fetch(url, options);

    return resp.json();
};

const getData = () => {
    transferData(url)
        .then(response => {
            if (response.status === 'success') {
                let html = `<div class="user-top">
                                <h1 class="user-main-title">Welcome to Mountain Bay</h1>
                            </div>
                            <div class="user-main">
                            <div class="close">x</div>
                            <div class="messages"></div>
                            <form class="list">
                                <ul>List of clients`

                response.data.forEach(value => {
                    html += `
                    
                    <li data-id='${value.id}'>
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

                html += '</ul></form></div >'

                document.querySelector('.user-container').innerHTML = html;

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

// window.addEventListener('load', () => {
//     getData();
// });

// document.querySelector('.close').addEventListener('click', () => {

//     let route = url + '/logout';
//     let method = 'GET';

//     transferData(route, method)
//         .then(resp => {
//             if (resp.status === 'success') {
//                 window.location.replace("/login/index.html");
//             }
//             // document.querySelector('#username').value = '';
//             // document.querySelector('#password').value = '';
//             messages(resp.message, resp.status);
//         });
// });



export { url, messageDiv, messages, transferData, getData };