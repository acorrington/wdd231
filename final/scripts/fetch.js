// fetch.js for Roseburg Volunteer Network
export async function getFeaturedEvent() {
    try {
        const response = await fetch('data/events.json');
        if (!response.ok) throw new Error('Failed to fetch events');
        const events = await response.json();
        return events[Math.floor(Math.random() * events.length)];
    } catch (error) {
        console.error('Fetch Error:', error);
        return null;
    }
}

export async function getEvents() {
    try {
        const response = await fetch('data/events.json');
        if (!response.ok) throw new Error('Failed to fetch events');
        const events = await response.json();
        return events;
    } catch (error) {
        console.error('Fetch Error:', error);
        return null;
    }
}