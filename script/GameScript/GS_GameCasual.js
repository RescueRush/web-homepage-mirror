document.addEventListener("DOMContentLoaded", async function () {
    if (! await checkSession() && !getDesignMode()) {
        window.location.assign("/game/connect");
    }

    loadCardTranslation();

    startGame();
});

function decompileAnswers(answers) {
    const list = [];
    const bits = 32; // Equivalent to Integer.BYTES * 8

    for (let i = 0; i < bits; i++) {
        if ((answers & (1 << i)) != 0) {
            list.push(i);
        }
    }
    return list;
}

function compileAnswers() {
    let result = 0;

    answerChoices.forEach(material => {
        if (material.classList.contains('active-card')) {
            const index = parseInt(material.materialid);
            //console.log("selected: " + index);
            // Set the corresponding bit at position `index` in `result`
            result |= (1 << index);
        }
    });

    return result;
}

function startGame() {
    setSessionLanguage(getStoredLanguage());

    request("GET", "/game/scenario/new")
        .then(response => response.json())
        .then(data => {
            if (data.status == 400) {
                document.getElementById("question").textContent = "{An error occured}";
            } else {
                showQuestion(data);
            }
        })
        .catch(error => {
            // TODO: Popup or something
            alert("Error: " + error);
            console.error("Error:", error);
        });
}

isFireworkAfined = false;
pointsComparator = 0;

let cardTranslations = [];
let continuePlayingTranslations = {
    en: ["🚨 Please register to continue playing 🎮", "📨 Register >>"],
    de: ["🚨 Bitte registrieren Sie sich, um weiterzuspielen 🎮", "📨 Registrieren >>"],
    lu: ["🚨 Registréiert Iech wgl., fir weiderzespillen 🎮", "📨 Registréieren >>"],
    fr: ["🚨 Veuillez vous inscrire pour continuer à jouer 🎮", "📨 S'inscrire >>"]
};

async function loadCardTranslation() {
    try {
        const response = await request("GET", "/game/translation/cards");
        const data = await response.json();
        if (data.status == 400) {
            document.getElementById("question").textContent = "{An error occured}";
        }
        cardTranslations = data;
    } catch (error) {
        document.getElementById("question").textContent = "{An error occured}";
        console.error("Error:", error);
    }
}

function showQuestion(data) {
    document.getElementById("question").textContent = data.desc;

    console.log("got data: " + data);

    updateScoreBox(data);

    const possibleAnswers = shuffle(decompileAnswers(data.possibleAnswers));
    console.log("possible answers: ", possibleAnswers);

    answerChoices.forEach(button => {
        // TODO: temporary: server needs to send 6/8 material cards
        button.materialid = possibleAnswers[parseInt(button.getAttribute("cardid"))];
        console.log(button.materialid, button.getAttribute("cardid"));
        button.querySelector("img").src = "../../images/cardicon/" + button.materialid + ".svg";
        button.querySelector("p").textContent = cardTranslations[button.materialid];
    });

    answerButton.classList.remove('hidden');
    answerButton.hidden = false;

    nextquestbtn.classList.add("hidden");
    nextquestbtn.hidden = true;

    isFireworkAfined = false;
    pointsComparator = data.points;
    removeConfettiWave();
}

function updateScoreBox(data) {
    document.querySelector("#Score > #value").textContent = data.points;
    document.querySelector("#Multiplier > #value").textContent = data.multiplier;
    document.querySelector("#Streak > #value").textContent = data.streak;
}

function playRound() {
    request("GET", "/game/scenario/answer", { answer: compileAnswers() })
        .then(async response => {
            if (response.status == 202) {
                const json = await response.json();
                showAnswers(json);
                showAllAnswersCorrect(json);
            } else {
                showAnswers(await response.json());
            }
        });
}

function showAllAnswersCorrect(data) {
    isFireworkAfined = true;
    answerChoices.forEach(button => {
        let waschecked = button.classList.contains('active-card');

        if (waschecked) {
            button.classList.add('right-card');
        }
    });

    document.getElementById('answer-btn').hidden = true;
    document.getElementById('next-question-btn').hidden = false;
}

function showAnswers(data) {
    updateScoreBox(data);
    answers = decompileAnswers(data.answer);

    answerChoices.forEach(button => {
        let waschecked = button.classList.contains('active-card');
        console.log(waschecked, button.materialid, answers.includes(button.materialid));

        if (answers.includes(button.materialid) && waschecked) { // correct & checked
            button.classList.add('right-card');
        } else if (!answers.includes(button.materialid) && waschecked) { // not correct but was checked
            button.classList.add('false-card');
        } else if (answers.includes(button.materialid) && !waschecked) { // correct but not checked
            button.classList.add('right-card-hidden');
        }
    });

    document.getElementById('answer-btn').hidden = true;
    document.getElementById('next-question-btn').hidden = false;

    showExplanation(data.text_answer);

    //Answer distinction
    if (pointsComparator != data.points) {
        isFireworkAfined = true;
        showSuccessfullMessage();
        launchConfettiWave(500, 100);

    } else {
        showFailureMessage();
        triggerWrongAnswerEffect();
    }
    pointsComparator = data.points;
}

async function nextQuestion() {
    try {
        let response = await request("GET", "/game/scenario/next");

        if (response.status === 418) { // i'm a teapot
            // anon session; log in
            newPopup(continuePlayingTranslations[getCurrentLanguage()][0], '<a href="../connect/register/">' + continuePlayingTranslations[getCurrentLanguage()][1] + "</a>");
        } else {
            body = await response.json();
            clearCards();
            showQuestion(body);
        }
    } catch (error) {
        alert("Error: " + error);
        console.error("Error:", error);
    }
    removeExplanation();
    removePhoneMessage();
    showNewSituationMessage();

}

function clearCards() {
    answerChoices.forEach(button => {
        button.classList.remove('active-card');
        button.classList.remove('right-card');
        button.classList.remove('false-card');
        button.classList.remove('right-card-hidden');
    });
}

let nextButtonText = {
    en: "Next",
    fr: "Suivant",
    de: "Nächste",
    lu: "Nächst",
};
let verfyButtonText = {
    en: "Verify",
    fr: "Vérifier",
    de: "Überprüfen",
    lu: "Iwwerpréiwen",
};

let scoreText = {
    en: "Score",
    fr: "Score",
    de: "Punktzahl",
    lu: "Punkten",
};
let multiplierText = {
    en: "Multiplier",
    fr: "Multiplicateur",
    de: "Multiplikator",
    lu: "Multiplikator",
};
let streakText = {
    en: "Streak",
    fr: "Série",
    de: "Streak",
    lu: "Streak",
};

document.addEventListener("click", (event) => {
    x = event.clientX;
    y = event.clientY;
    if (isFireworkAfined) { launchFirework(x, y); }
});

document.addEventListener("DOMContentLoaded", () => {
    const nextquestbtn = document.querySelector('#nextquestbtn'); // or correct selector
    const answerButton = document.querySelector('#answerButton'); // adjust if needed

    const localLang = getCurrentLanguage();

    Promise.resolve().then(() => {
        if (nextquestbtn) {
            nextquestbtn.textContent = nextButtonText[localLang];
        }
    });

    if (answerButton) {
        answerButton.textContent = verfyButtonText[localLang];
    }
});



function getCardType(cardId) {
    researchedCard = "#card" + (cardId + 1);
    div = document.querySelector(researchedCard);
    img = div.querySelector('img'); // finds the <img> inside the div

    temp = img.src.replace(/^https?:\/\/[^\/]+/, '');

    for (let i = 1; i < 10; i++) {
        if (temp.includes(i)) {
            console.log(i);
            return i;
        }
    }
    console.log(0);
    return 0;
}


function checkScreenSize() {

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


