// Select the specific checkboxes by class or ID
const dropdownToggle = document.querySelector('#dropdown-toggle');
const loggerToggle = document.querySelector('#logger-toggle');

// Create an array of these checkboxes
const checkboxes = [dropdownToggle, loggerToggle];

// already present in GS_GameCasual.js
document.addEventListener('DOMContentLoaded', async function () {
    if (! await checkToken() && window.location.hostname !== "localhost") {
        window.location.assign("../../connect"); // Redirect to the login page if not logged in and not localhost
    }
});

function swapToDiv(selector) {
    const main = document.querySelector('.current');
    if (main) {
        main.classList.remove('current');
        if (main.id === "profile") {
            main.classList.add('hidden');
        }
    }

    const neo = document.querySelector(selector);
    if (neo) {
        if (selector === "#profile") {
            neo.classList.remove('hidden');
        }
        neo.classList.add('current');
    } else {
        console.warn(`No element matches selector: ${selector}`);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector('#main-menu');
    const intro = document.querySelector('#logostarter');
    main.classList.remove('menu');
    main.classList.add('animator');
    setTimeout (() => {
        main.classList.remove('animator');
        main.classList.add('current');
        intro.classList.add('transparent');
    }, 3000);
});