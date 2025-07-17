async function getData() {
    const response = await fetch('./data/members.json'); // request
    const data = await response.json(); // parse the JSON data

    return data; // return the data for further processing
}

getData().then(data => {
    // Process the data here
    let spotlight = document.querySelector("#home-section");
    // spotlight.innerHTML = ""; // Clear existing content

    // Get random members for spotlight where membership_level is 3
    let level3Members = data.filter(member => member.membership_level === 3);

    // Shuffle and pick up to 3 random members
    let randomMembers = level3Members
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    randomMembers.forEach(member => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("spotlight");
         card.innerHTML = `
            <h2>${member.name}</h2>
            <p>${member.tagline}</p>
            <div class="spotlight-details">
                <img src="images/members/${member.image}" alt="${member.name}" class="member-image">
                <div>
                    <p><span>Email:</span> ${member.email}</p>
                    <p><span>Phone:</span> ${member.phone}</p>
                    <p><span>Url:</span> <a href="${member.website}" target="_blank">${member.website}</a></p>
                </div>
            </div>
        `;
        spotlight.appendChild(card);
    });
});