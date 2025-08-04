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
        <div><img src="images/discover/${item.image}" alt="${item.name}" loading="lazy"></div>
        <p>${item.address}</p>
        <p>${item.description}</p>
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

    // Grid layout based on screen size
    const gridContainer = document.querySelector('.grid-container');
    function updateGridLayout() {
        const width = window.innerWidth;
        if (width <= 640) {
            gridContainer.style.gridTemplateAreas = `
                "sidebar"
                "cards"
            `;
            gridContainer.style.gridTemplateColumns = "1fr";
        } else if (width <= 1024) {
            gridContainer.style.gridTemplateAreas = `
                "sidebar sidebar"
                "cards cards"
            `;
            gridContainer.style.gridTemplateColumns = "1fr 1fr";
        } else {
            gridContainer.style.gridTemplateAreas = `
                "sidebar cards"
                "sidebar cards"
            `;
            gridContainer.style.gridTemplateColumns = "1fr 3fr";
        }
    }
    updateGridLayout();
    window.addEventListener('resize', updateGridLayout);

    // Sidebar content
    const visitMessage = document.querySelector('#visit-message');
    visitMessage.innerHTML = `
        <h3>Welcome to Roseburg</h3>
        <p>Discover the charm of Roseburg, OR, nestled in the Umpqua Valley with its scenic beauty, rich history, and thriving community. Known for its wine production, outdoor recreation, and friendly atmosphere, Roseburg offers something for everyone.</p>
        <p>Explore local attractions, connect with businesses, and consider joining the Chamber to be part of our growth. Contact us for more information!</p>
    `;

    // Last visit message
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