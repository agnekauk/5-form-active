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
            <ul>
            <div class="row">
            <h5>List of clients</h5>
            <a class="user-btn add-new">Add new client</a>
            </div>`

                response.data.forEach(value => {
                    html += `
                
                <li data-id='${value.id}'>
                <div class="client-info">
                <div>
                <span>Company:</span> <p>${value.company.name}</p>
                <span>Client Name:</span> <p>${value.name}</p>
                </div>
                <div>Contacts: 
                <span>Client email:</span> <p> ${value.email}</p>
                <span>Phone:</span> <p> ${value.phone}</p>
                </div>
                </div>
                <div class="btn-container">
                <a class="user-btn">Edit</a>
                <a class="user-btn red-btn">Delete</a>
                </div>
                </li>`
                })

                html += `</ul>
            </form>
            </div >`

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

                document.querySelector('.close').addEventListener('click', () => {

                    let route = url + '/logout';
                    let method = 'GET';

                    transferData(route, method)
                        .then(resp => {
                            if (resp.status === 'success') {
                                window.location.replace("/login/index.html");
                            }
                            messages(resp.message, resp.status);
                        });
                });

                const openModal = () => {

                    let html2 = ` <div class="modal">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h2>Add new product</h2>
                                            </div>
                                            <div class="modal-body">
                                                <div class="card-body">
                                                    <div class="modal-row">
                                                        <div class="form-row">
                                                            <label class="fu gray">Company:</label>
                                                            <input type="text" class="form-control" value=""/>
                                                        </div>
                                                    </div>
                                                    <div class="modal-row">
                                                        <div class="form-row">
                                                            <label class="fu gray">Client Name:</label>
                                                            <input type="text" class="form-control" value=""/>
                                                        </div>
                                                    </div>
                                                    <div class="modal-row">
                                                        <div class="form-row">
                                                            <label class="fu gray">Client email:</label>
                                                            <input type="email" class="form-control" value=""/>
                                                        </div>
                                                    </div>
                                                    <div class="modal-row">
                                                        <div class="form-row">
                                                            <label class="fu gray">Phone:</label>
                                                            <input type="phone" class="form-control"value=""/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn-modal-close btn">Close</button>
                                                <button type="button" class="btn-modal-save btn">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`

                    document.querySelector('.place-for-modal').innerHTML = html2;
                    document.querySelector('.modal').classList.add("modal-show");
                    document.querySelector(".btn-modal-close").addEventListener('click', () => {
                        document.querySelector('.modal').classList.add("modal-hide");
                    })
                };

                document.querySelector(".add-new").addEventListener('click', () => { openModal() });

            } else {
                messages(response.message, response.status);
            }

        })
};

export { url, messageDiv, messages, transferData, getData };