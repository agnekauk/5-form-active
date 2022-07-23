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
    }

    if (method != 'GET') {
        options.body = JSON.stringify(data);
    }

    const resp = await fetch(url, options);

    return resp.json()
}

export { url, messageDiv, messages, transferData };