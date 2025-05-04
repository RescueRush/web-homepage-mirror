const GM_QUIZ = 0;
const GM_TYPE_CASUAL = 0;
const GM_TYPE_TIMED = 1;

const LANG_LU = 1
const LANG_EN = 2
const LANG_FR = 3
const LANG_DE = 4

const LANGS = {
    "lu": LANG_LU,
    "en": LANG_EN,
    "fr": LANG_FR,
    "de": LANG_DE
}

const url = window.location.hostname === "rescue-rush.lu"
    ? "https://api.rescue-rush.lu:8443"
    : "http://localhost:8443";

async function request(method, path, body) {
    let uurl = url + path;

    if (method.toUpperCase() === 'GET' && body) {
        const params = new URLSearchParams(body).toString();
        uurl += '?' + params;
    }

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };

    // Add body if the method is not GET
    if (method.toUpperCase() !== 'GET' && body) {
        options.body = JSON.stringify(body);
    }

    return fetch(uurl, options);
}

function openLanguagePopup() {
    if(document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'flex';
    }else {
        window.location.replace("/");
    }
}

function getStoredLanguage() {
    return localStorage.getItem("language") || getCookie("language");
}

function setStoredLanguage(language) {
    localStorage.setItem("language", language);
}

function updateLanguage(language) {
    setStoredLanguage(language);
    updateLanguageContent(language);
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

function getPageSource() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("s");
}

function getCurrentLanguage() {
    const url = window.location.href;
    if (url.includes("/en/")) {
        return "en";
    } else if (url.includes("/fr/")) {
        return "fr";
    } else if (url.includes("/de/")) {
        return "de";
    } else if (url.includes("/lu/")) {
        return "lu";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const url = window.location.href;

    if(!getStoredLanguage() && getCurrentLanguage() && getCurrentLanguage()) { // store language depending on current page if not already stored
        setStoredLanguage(getCurrentLanguage());
        return;
    }

    if(getCurrentLanguage() !== getStoredLanguage() && getCurrentLanguage()) { // update language depending on current page
        setStoredLanguage(getCurrentLanguage());
        return;
    }
});

function updateLanguageContent(language) {
    const url = window.location.href;
    if (
        !url.includes("/en/") &&
        !url.includes("/fr/") &&
        !url.includes("/de/") &&
        !url.includes("/lu/")
    ) {
        switch (language) {
            case "en":
                if (!url.includes("/en/")) {
                    window.location.href = "./en/";
                }
                break;
            case "de":
                if (!url.includes("/de/")) {
                    window.location.href = "./de/";
                }
                break;
            case "fr":
                if (!url.includes("/fr/")) {
                    window.location.href = "./fr/";
                }
                break;
            case "lu":
                if (!url.includes("/lu/")) {
                    window.location.href = "./lu/";
                }
                break;
        }
    }
}

function getLanguageId() {
    return LANGS[getStoredLanguage()];
}

async function checkSession() {
    try {
        const response = await request("GET", "/user/tokenValid");
        return response.ok;
    } catch (error) {
        alert("Error: " + error);
        console.error("Error:", error);
        return false;
    }
}

async function hashPass(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function formatDate(timestampStr) {
    const date = new Date(timestampStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
