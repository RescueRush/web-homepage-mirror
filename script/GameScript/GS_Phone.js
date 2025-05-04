let textEN = [
    "✅ Life saved!", 
    "Amazing work! 👏", 
    "❌ We lost this one... 😔", 
    "⏳ Hurry, the next life depends on you!", 
    "📩 A New Patient has an emergency",
    "📲 Check your dashbox!"
];
let textFR = [
    "✅ Vie sauvée !",
    "Incroyable travail ! 👏",
    "❌ Nous avons perdu celui-ci... 😔",
    "⏳ Dépêchez-vous, la prochaine vie dépend de vous !",
    "📩 Un nouveau patient a une urgence",
    "📲 Vérifiez votre boîte de réception !"
];

let textDE = [
    "✅ Leben gerettet!",
    "Fantastische Arbeit! 👏",
    "❌ Wir haben das Patient verloren... 😔",
    "⏳ Beeilen Sie sich, das nächste Leben hängt von Ihnen ab!",
    "📩 Ein neuer Patient hat einen Notfall",
    "📲 Überprüfen Sie Ihr Dashbox!"
];
let textLU = [
    "✅ Liewen gerett!",
    "Super Aarbecht! 👏",
    "❌ Mir hunn een verluer... 😔",
    "⏳ Mei schnell, d'nächst Liewen hänkt vun Iech of!",
    "📩 E neie Patient huet ee Noutfall",
    "📲 Kuckt Är Dashbox!"
]; 

let currentText;

function setCurrentText(autolang = true, forcelanguage = null) {
    
    lang = localStorage.getItem("language");
    if (autolang) {
        console.log("Language set to: " + lang, "(auto).");
    }
    if (!autolang){
        lang = forcelanguage;
        console.log("Language set to: " + lang, "(forced). Should be '" + forcelanguage + "'");
    }
    switch (lang) {
        case 'en': currentText = textEN; break;
        case 'fr': currentText = textFR; break;
        case 'de': currentText = textDE; break;
        case 'lu': currentText = textLU; break;
        default: alert("Language not set!"); break;
    }
}

function checkScreenSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const phoneWrapper = document.querySelector('.phone-wrapper');

    if (phoneWrapper) {
        // If the screen is smaller than 600px in width or 900px in height, hide the phone
        if (width < 600 || height < 900) {
            phoneWrapper.style.display = 'none';
        } else {
            phoneWrapper.style.display = 'block';
        }
    }
}


// General function to show the phone with a custom message
function showPhoneMessage(message = "Hello there!", removeAfter = false, duration = 2000) {
    // Remove existing phone if present
    const existing = document.querySelector('.phone-wrapper');
    if (existing) existing.remove();

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'phone-wrapper';

    // Create phone
    const phone = document.createElement('div');
    phone.className = 'phone-container';

    const screen = document.createElement('div');
    screen.className = 'screen';

    const button = document.createElement('div');
    button.className = 'button';

    const speaker = document.createElement('div');
    speaker.className = 'speaker';

    const bubble = document.createElement('div');


    bubble.className = 'speech-bubble';
    bubble.textContent = message;

    // Build structure
    phone.appendChild(screen);
    phone.appendChild(button);
    phone.appendChild(speaker);
    wrapper.appendChild(phone);
    wrapper.appendChild(bubble);
    document.body.appendChild(wrapper);

    // Check screen size whenever the phone is displayed
    checkScreenSize();
    if (removeAfter && existing) {
        setTimeout(() => {
            if (existing) removePhoneMessage(); // Remove the phone after the animation
        }, duration); // Remove after 2 seconds
    }

}

function removePhoneMessage() {
    const existing = document.querySelector('.phone-wrapper');
    if (existing) existing.classList.add('active');
    setTimeout(() => {
        if (existing) existing.remove(); // Remove the phone after the animation
    }, 1000);
}


function showSuccessfullMessage() {
    showPhoneMessage(currentText[0]); // Life saved!
    setTimeout(() => {
        showPhoneMessage(currentText[1]); // Amazing work! 👏
        setTimeout(() => {
            removePhoneMessage();
        }, 1000);
    }, 1000); // 2 seconds later
}

function showFailureMessage() {
    showPhoneMessage(currentText[2]);

    setTimeout(() => {
        showPhoneMessage(currentText[3]);
        setTimeout(() => {
            removePhoneMessage();
        }, 1000);
    }, 1000); // 2 seconds later
}

function showNewSituationMessage() {
    showPhoneMessage(currentText[4]);
    setTimeout(() => {
        showPhoneMessage(currentText[5]);
        setTimeout(() => {
            removePhoneMessage();
        }, 1000);
    }, 1000); // 2 seconds later
}

// Check screen size on resize
window.addEventListener('resize', checkScreenSize);

document.addEventListener("DOMContentLoaded", () => {
    setCurrentText(); 
});
