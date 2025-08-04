async function getDiscoverData() {
    const response = await fetch('./data/discover.json');
    const data = await response.json();
    return data;
}

function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <h2>${item.name}</h2>
        <img src="images/discover/${item.image}" class="discover" alt="${item.name}" loading="lazy">
        <p>${item.description}</p>
        <p>${item.address}</p>
        <p><a href="${item.website}" target="_blank">Visit Website</a></p>
    `;
    return card;
}

function displayDiscoverData(data) {
    const cardArea = document.querySelector('.card-area');
    data.forEach(item => {
        const card = createCard(item);
        cardArea.appendChild(card);
    });

    // Last visit message
    const visitMessage = document.querySelector('#visit-message');
    let lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    let visitText = '';
    if (!lastVisit) {
        visitText = '<p>Welcome! Let us know if you have any questions.</p>';
    } else {
        const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysDiff < 1) {
            visitText = '<p>Back so soon! Awesome!</p>';
        } else {
            visitText = `<p>You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.</p>`;
        }
    }
    visitMessage.innerHTML += visitText;
    localStorage.setItem('lastVisit', now);
}

getDiscoverData().then(displayDiscoverData);