const year = document.querySelector("#current-year");
const today = new Date();
year.innerHTML = today.getFullYear();

const modified = document.querySelector("#last-updated");
const lastModified = new Date(document.lastModified);
modified.innerHTML = lastModified.toDateString();