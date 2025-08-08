// opportunities.js for Roseburg Volunteer Network
import { getEvents } from './fetch.js';

async function displayEvents(filter = 'all') {
    const events = await getEvents();
    // console.log('Fetched events:', events);
    const filteredEvents = filter === 'all' ? events : events.filter(event => event.skills && event.skills.includes(filter));
    const container = document.querySelector('#events-grid');
    container.innerHTML = '';
    for (const event of filteredEvents) {
        const card = document.createElement('article');
        card.className = 'event-card';
        card.setAttribute('data-id', event.id);
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.innerHTML = `
        <img src="images/events/${event.image}" alt="${event.title}" loading="lazy">
        <h3>${event.title}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Skills:</strong> ${event.skills || 'N/A'}</p>
        <p>${event.impact || 'No description information available.'}</p>
      
    `;
        card.addEventListener('click', () => openModal(event.id));
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') openModal(event.id);
        });
        container.appendChild(card);
    }
}

function openModal(id) {
    const events = getEvents();
    events.then(data => {
        const event = data.find(e => e.id === id);
        if (event) {
            document.querySelector('#modal-image').src = `images/events/${event.image}`;
            document.querySelector('#modal-image').alt = event.title || 'Event Image';
            document.querySelector('#modal-title').textContent = event.title;
            document.querySelector('#modal-impact').textContent = event.impact || 'No impact information available.';
            document.querySelector('#modal-description').textContent = event.description || 'No description available.';
            document.querySelector('#modal-date-time').textContent = `${new Date(event.date).toLocaleDateString('en-US')} ${event.time}` || 'Time not specified.';
            document.querySelector('#modal-contact').textContent = event.contact || 'Contact not available.';

            const modal = document.querySelector('#event-modal');
            modal.showModal();
            
            const closeModal = document.querySelector('#modal-close');
            closeModal.addEventListener('click', () => {
                modal.close();
            });
        }
    });
}

document.querySelector('#event-filter').addEventListener('change', (e) => {
    localStorage.setItem('preferredFilter', e.target.value);
    displayEvents(e.target.value);
});


// document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && document.querySelector('#event-modal').style.display === 'block') {
//         modal.close();
//     }
// });

// Load events on page load
document.addEventListener('DOMContentLoaded', async () => {
    const savedFilter = localStorage.getItem('preferredFilter') || 'all';
    document.querySelector('#event-filter').value = savedFilter;
    await displayEvents(savedFilter);
});