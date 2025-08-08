const params = new URLSearchParams(window.location.search);
document.querySelector('#display-name').textContent = params.get('name') || 'N/A';
document.querySelector('#display-email').textContent = params.get('email') || 'N/A';
document.querySelector('#display-event-type').textContent = params.get('event-type') || 'N/A';
document.querySelector('#display-availability').textContent = params.get('availability') || 'N/A';