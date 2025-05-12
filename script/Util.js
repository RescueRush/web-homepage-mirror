const LANG_LU = "lb";
const LANG_EN = "en";
const LANG_FR = "fr";
const LANG_DE = "de";

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
    if (document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'flex';
    } else {
        window.location.replace("/");
    }
}

function getStoredLanguage() {
    return localStorage.getItem("language") || getCookie("language");
}

function setStoredLanguage(language) {
    localStorage.setItem("language", language);
}

async function setSessionLanguage(language) {
    await request("GET", "/user/set-lang", { lang: language });
}

function updateLanguage(language) {
    setStoredLanguage(language);
    setSessionLanguage(language);
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
    } else {
        return getStoredLanguage();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const url = window.location.href;

    if (!getStoredLanguage() && getCurrentLanguage()) { // store language depending on current page if not already stored
        setStoredLanguage(getCurrentLanguage());
        return;
    }

    setStoredLanguage(getCurrentLanguage());
});

function updateLanguageContent(language) {
    const url = new URL(window.location.href);

    if (
        !url.pathname.includes("/en/") &&
        !url.pathname.includes("/fr/") &&
        !url.pathname.includes("/de/") &&
        !url.pathname.includes("/lu/")
    ) {
        let newPath;
        switch (language) {
            case "en":
                if (!url.pathname.includes("/en/")) {
                    newPath = "./en/";
                }
                break;
            case "de":
                if (!url.pathname.includes("/de/")) {
                    newPath = "./de/";
                }
                break;
            case "fr":
                if (!url.pathname.includes("/fr/")) {
                    newPath = "./fr/";
                }
                break;
            case "lu":
                if (!url.pathname.includes("/lu/")) {
                    newPath = "./lu/";
                }
                break;
        }

        if (newPath) {
            // Redirect preserving search params and hash
            window.location.href = `${newPath}${url.search}${url.hash}`;
        }
    }
}


async function checkToken() {
    try {
        const response = await request("GET", "/user/check-auth");
        return response.status === 202;
    } catch (error) {
        newPopup("Couldn't check token validity.", "Ok");
        console.error("Error:", error);
        return false;
    }
}

async function checkSession() {
    try {
        const response = await request("GET", "/user/check-auth");
        return response.status === 200 || response.status === 202;
    } catch (error) {
        newPopup("Couldn't check token validity.", "Ok");
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



// =============================================================================
// Designer Mode
// =============================================================================

originalTitle = document.title;

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.hostname === "localhost") {
        showDesignModeToggle();
        if (getDesignMode()) {
            originalTitle = "Design Mode 🎨";
            document.title = originalTitle;
            showDesignModeBar();
        }
    }
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden && !getDesignMode()) {
        document.title = "👀 Come back!";
    } else {
        document.title = originalTitle;
    }
});

function setDesignMode(mode = true) {
    localStorage.setItem("designMode", mode);
    location.reload();
}

function getDesignMode() {
    return localStorage.getItem("designMode") == "true";
}

function showDesignModeToggle() {
    const designModeBar = document.createElement("div");
    designModeBar.id = "design-mode-bar";
    modeIcon = getDesignMode() ? "🛠️" : "🎨";
    color = getDesignMode() ? "#D32F2Fff" : "#5AC8FAff";
    modeToSwitch = getDesignMode() ? "Switch to Normal Mode" : "Switch to Design Mode";
    getDesignMode() ? designModeBar.classList.add("active") : designModeBar.classList.remove("active");
    designModeBar.innerHTML = `
        <div class="design-mode-content">
            <button id="toggle-design-mode" title="${modeToSwitch}">${modeIcon}</button>
            <style>
                #design-mode-bar {
                    position: fixed;
                    top: 50%;
                    right: 0;
                    padding: 10px;
                    z-index: 999999;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .design-mode-content {
                    display: flex;
                    align-items: center;
                }
                #toggle-design-mode {
                    margin-left: 10px;
                    font-size: 24px;
                    padding: 8px;
                    background-color: ${color};
                    color: white;
                    border: none;
                    border-radius: 30%;
                    cursor: pointer;
                    backdrop-filter: blur(2px);
                }
                #toggle-design-mode:hover {
                    transform: scale(0.9);
                }
            </style>
        </div>
    `;
    document.body.appendChild(designModeBar);


    document.getElementById("toggle-design-mode").addEventListener("click", () => {
        setDesignMode(!getDesignMode());
    });
}

function showDesignModeBar() {
    designModeBar = document.createElement("designerModeBar");
    designModeBar.innerHTML = `
    <div id="designBar">
        <button id="toggleCollapse" title="Collapse Bar">▼</button>
        <button id="addShortcut" class="utilbutton" title="Create New Shortcut">✚</button>
        <button id="clearShortcuts" class="utilbutton" title="Clear All Shortcuts">🗑️</button>
      </div>
      
      <div id="popup">
        <input type="text" id="funcInput" placeholder="Enter JS function (e.g. alert('Hello'))">
        <input type="text" id="emojiInput" placeholder="Enter name (e.g. function())">
        <button id="confirmAdd" title="Confirm Shortcut Creation"> Add ✔️</button>
      </div>
      <style>
        #designBar {
            position: fixed;
            top: 15%;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 1000;
            transition: all 0.3s ease;
        }
        @media (max-width: 600px) {
            #designBar {
                top: 5%;
                left: 5%;
            }      
        }
        .bar-hidden .shortcut-btn {
            transform: scale(0);
            width: 0;
            padding: 0;
            margin: 0;
            display: none;
            transition: all 0.3s ease;
            
            
            }
        designerModeBar button {
            font-size: 16px;
            cursor: pointer;
            border: 1px solid transparent;
            background: rgba(255, 255, 255, .4);
            padding: 10px 12px;
            border-radius: 10px;
            font-family: Excon-Variable, sans-serif;
            transition: all 0.3s ease;
        }
        designerModeBar button:hover {
            filter: brightness(1.2);
            border: 1px solid #5AC8FAff;
        }
        #popup {
            position: fixed;
            top: 35%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(20px);
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            gap: 10px;          
        }
        #popup input {
        outline: none;
            padding: 8px;
            border: none;
            border-radius: 6px;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.1);
            box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
            color: black;
            transition: all 0.3s ease;     
            border: 1px solid rgba(0, 0, 0, 0.01);
        }

        #popup input:focus {
            border: 1px solid #5AC8FAff;
        }
      </style>
    `;

    document.body.appendChild(designModeBar);

    const designBar = document.getElementById('designBar');
    let utilbuttons = designBar.querySelectorAll('.utilbutton');
    const popup = document.getElementById('popup');
    const funcInput = document.getElementById('funcInput');
    const emojiInput = document.getElementById('emojiInput');
    const confirmAdd = document.getElementById('confirmAdd');
    const toggleCollapse = document.getElementById('toggleCollapse');
    const addShortcut = document.getElementById('addShortcut');
    const clearShortcuts = document.getElementById('clearShortcuts');

    if (localStorage.getItem('isDevBarCollapsed') == null) {
        localStorage.setItem('isDevBarCollapsed', false);
    }
    let collapsed = localStorage.getItem('isDevBarCollapsed');

    // Load saved shortcuts
    function loadShortcuts() {
        collapseDevBar();
        const shortcuts = JSON.parse(localStorage.getItem('shortcuts') || '[]');
        shortcuts.forEach(({ emoji, code }) => createShortcutButton(emoji, code));
    }

    // Save shortcuts
    function saveShortcuts() {
        const buttons = document.querySelectorAll('.shortcut-btn');
        const shortcuts = Array.from(buttons).map(btn => ({
            emoji: btn.textContent,
            code: btn.dataset.code
        }));
        localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
    }

    // Create shortcut button
    function createShortcutButton(emoji, code) {
        const btn = document.createElement('button');
        btn.textContent = emoji;
        btn.className = 'shortcut-btn';
        btn.dataset.code = code;
        btn.onclick = () => eval(code);
        designBar.insertBefore(btn, clearShortcuts);
    }

    // Add shortcut popup
    addShortcut.onclick = () => {
        popup.style.display = 'flex';
        funcInput.value = '';
        emojiInput.value = '';
    };

    confirmAdd.onclick = () => {
        const code = funcInput.value.trim();
        const emoji = emojiInput.value.trim();
        if (code && emoji) {
            createShortcutButton(emoji, code);
            saveShortcuts();
        }
        popup.style.display = 'none';
    };

    // Collapse / expand bar
    toggleCollapse.onclick = function () {
        collapseDevBar();
        localStorage.setItem('isDevBarCollapsed',collapsed);
         };

    // Clear all shortcuts
    clearShortcuts.onclick = () => {
        document.querySelectorAll('.shortcut-btn').forEach(btn => btn.remove());
        localStorage.removeItem('shortcuts');
    };

    function collapseDevBar(){
        collapsed = !collapsed;
        designBar.classList.toggle('bar-hidden', collapsed);
        utilbuttons.forEach(btn => {
            if (collapsed) {
                btn.style.display = 'none';
            } else {
                btn.style.display = 'block';
            }
        });
        designBar.style.left = collapsed ? '5%' : '50%';
        toggleCollapse.textContent = collapsed ? '▲' : '▼';
    }

    // Initialize
    loadShortcuts();
}

