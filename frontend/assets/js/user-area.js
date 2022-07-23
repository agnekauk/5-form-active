import { transferData, url, messages } from './common.js';

const getData = () => {
    transferData(url)
        .then(response => {
            if (response.status === 'success') {
                let html = `<h1>Sveikiname prisijungus!</h1>
                        <ul>`

                response.data.forEach(value => {
                    html += `<li data-id='${value.id}'>
                    <div>${value.username} ${value.email}</div>
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
                messages(resp.message, resp.status);
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
}

window.addEventListener('load', () => {
    getData();
})