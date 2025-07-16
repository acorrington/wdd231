const navbutton = document.querySelector("#ham-btn");
const mainNav = document.querySelector('#main-nav');

navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    mainNav.classList.toggle('show');
});


const gridViewButton = document.querySelector("#grid-view");
const listViewButton = document.querySelector("#list-view");

gridViewButton.addEventListener("click", () => {
    let directory = document.querySelector("#directory-section");
    directory.classList.add("grid-view");
    directory.classList.remove("list-view");
    let listViewButton = document.querySelector("#list-view");
    listViewButton.classList.toggle("active");
    let gridViewButton = document.querySelector("#grid-view");
    gridViewButton.classList.toggle("active");
});

listViewButton.addEventListener("click", () => {
    let directory = document.querySelector("#directory-section");
    directory.classList.add("list-view");
    directory.classList.remove("grid-view");
    let listViewButton = document.querySelector("#list-view");
    listViewButton.classList.toggle("active");
    let gridViewButton = document.querySelector("#grid-view");
    gridViewButton.classList.toggle("active");
});

async function getData() {
    const response = await fetch('./data/members.json'); // request
    const data = await response.json(); // parse the JSON data
    //console.log(data);  temp output test of data response 
    return data; // return the data for further processing
}

getData().then(data => {
    // Process the data here
    let directory = document.querySelector("#directory-section");
    directory.innerHTML = ""; // Clear existing content

    data.forEach(member => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h2>${member.name}</h2>
            <img src="images/members/${member.image}" alt="${member.name}" class="member-image">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        directory.appendChild(card);
    });
});