// form.js for Roseburg Volunteer Network
document.querySelector('#volunteer-form').addEventListener('submit', (e) => {
    const email = document.querySelector('#email').value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        e.preventDefault();
        alert('Please enter a valid email address.');
    } else {
        localStorage.setItem('lastFormSubmit', new Date().toISOString());
    }
});