const ws = new WebSocketWrapper({ maxReconnectAttempts: 3 });

ws.onConnected(() => {
    console.log("Connected to server.");
    ws.sendPacket("new");
});

ws.onDisconnect(() => {
    console.log("Connection lost. Will attempt to reconnect...");
});

ws.registerCallback("new", payload => {
    console.log("New:", payload);
    showQuestion(payload);
    updateScoreBox(payload);
});

ws.registerCallback("answer-timeout", payload => {
    console.log("answer-timeout:", payload);
});

ws.registerCallback("next", payload => {
    console.log("Next:", payload);
    showQuestion(payload);
    updateScoreBox(payload);
});

function showQuestion(payload) {
    document.querySelector("#question").textContent = payload.desc;
    payload.possibleAnswers.forEach((answer, index) => {
        let cEl = document.querySelector('#cardscontainer>#answer'+index);
        cEl.textContent = answer.question;
        cEl.setAttribute("answercode", answer.code);
    });
}

function playRound() {
    let code = document.querySelector('#cardscontainer>.active-card').getAttribute("answercode");
    ws.sendPacket("answer", { answer: code });
}

function nextQuestion() {
    ws.sendPacket("next");

    /*removeExplanation();
    removePhoneMessage();
    showNewSituationMessage();
    removeConfettiWave();*/
}

function clearAnswer() {
    answerChoices.forEach(button => {
        button.classList.remove('active-card');
        button.classList.remove('right-card');
        button.classList.remove('false-card');
        button.classList.remove('right-card-hidden');
    });
}

function updateScoreBox(data) {
    document.querySelector("#Score > #value").textContent = data.points;
    document.querySelector("#Multiplier > #value").textContent = data.multiplier;
    document.querySelector("#Streak > #value").textContent = data.streak;
}

document.addEventListener("DOMContentLoaded", async function () {
    await setSessionLanguage(getCurrentLanguage());
    ws.connect("ws://localhost:8443/game/quiz");
});