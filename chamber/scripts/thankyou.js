// Function to get URL query parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        firstName: params.get('firstname') || 'Not provided',
        lastName: params.get('lastname') || 'Not provided',
        email: params.get('email') || 'Not provided',
        phone: params.get('phone') || 'Not provided',
        orgName: params.get('org-name') || 'Not provided',
        timestamp: params.get('timestamp') || new Date().toLocaleString()
    };
}

// Display form data
window.onload = function () {
    const data = getQueryParams();
    document.getElementById('first-name').textContent = data.firstName;
    document.getElementById('last-name').textContent = data.lastName;
    document.getElementById('email').textContent = data.email;
    document.getElementById('mobile').textContent = data.phone;
    document.getElementById('business').textContent = data.orgName;
    document.getElementById('timestamp').textContent = data.timestamp;
};