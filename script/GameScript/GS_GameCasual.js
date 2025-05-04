document.addEventListener("DOMContentLoaded", async function () {
    if(! await checkSession()) {
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

    cardButtons.forEach(material => {
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
    request("GET", "/game/quiz/new", { type: GM_TYPE_CASUAL, lang: getLanguageId() })
        .then(response => response.json())
        .then(data => {
            if(data.status == 400) {
                document.getElementById("question").textContent = "{An error occured}";
            }else {
                showQuestion(data);
            }
        })
        .catch(error => {
            // TODO: Popup or something
            alert("Error: " + error);
            console.error("Error:", error);
        });
}

let cardTranslations = [];

async function loadCardTranslation() {
    try {
        const response = await request("GET", "/game/quiz/cards", { lang: getLanguageId() });
        const data = await response.json();
        if(data.status == 400) {
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

    updateScoreBox(data);

    const possibleAnswers = shuffle(decompileAnswers(data.possibleAnswers));
    console.log("possible answers: ",possibleAnswers);

    cardButtons.forEach(button => {
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
}

function updateScoreBox(data) {
    document.querySelector("#Score > #value").textContent = data.points;
    document.querySelector("#Multiplier > #value").textContent = data.multiplier;
    document.querySelector("#Streak > #value").textContent = data.streak;
}

function playRound() {
    request("GET", "/game/quiz/answer", { answer: compileAnswers(), lang: getLanguageId() })
        .then(async response => {
            if (response.status == 202) {
                const json = await response.json();
                await showAllAnswersCorrect(json);
                await updateScoreBox(json);
            } else {
                showAnswers(await response.json());
            }
        });
}

function showAllAnswersCorrect(data) {
    cardButtons.forEach(button => {
        let waschecked = button.classList.contains('active-card');

        if (waschecked) {
            button.classList.add('right-card');
        }
    });

    document.getElementById('answer-btn').hidden = true;
    document.getElementById('next-question-btn').hidden = false;

    showExplanation(data.text_answer);
    showSuccessfullMessage();
    launchConfettiWave(500, 100);
}

function showAnswers(data) {
    updateScoreBox(data);
    answers = decompileAnswers(data.answer);

    cardButtons.forEach(button => {
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
    showFailureMessage();
    triggerWrongAnswerEffect()
}

function nextQuestion() {

    request("GET", "/game/quiz/next", { lang: getLanguageId() })
        .then(response => response.json())
        .then(body => {
            clearCards();
            showQuestion(body);
        });
        removeExplanation();
        removePhoneMessage();
        showNewSituationMessage();
        removeConfettiWave();
}

function clearCards() {
    cardButtons.forEach(button => {
        button.classList.remove('active-card');
        button.classList.remove('right-card');
        button.classList.remove('false-card');
        button.classList.remove('right-card-hidden');
    });
}

