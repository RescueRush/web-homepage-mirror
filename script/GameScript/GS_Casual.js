const answerChoices = document.querySelectorAll('#cardscontainer button');
const answerButton = document.getElementById('answer-btn');
const nextquestbtn = document.getElementById('next-question-btn');

answerChoices.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active-card');

        const anyActive = Array.from(answerChoices).some(btn => btn.classList.contains('active-card'));

        if (anyActive) {
            answerButton.classList.add('activated');
            answerButton.classList.remove('notready');
        } else {
            answerButton.classList.add('notready');
            answerButton.classList.remove('activated');
        }
    });
});

answerButton.addEventListener('click', () => {
    if (answerButton.classList.contains('activated')) {

        answerButton.classList.add('notready');
        answerButton.classList.remove('activated');
        answerButton.classList.add('hidden');

        nextquestbtn.classList.remove('hidden');
        nextquestbtn.classList.add('activated');

        playRound();
    } else {
        console.log('Please select a card !');
    }
});

nextquestbtn.addEventListener('click', () => {
    if (nextquestbtn.classList.contains('activated')) {

        nextquestbtn.classList.add('hidden');
        nextquestbtn.classList.remove('activated');

        answerButton.classList.remove('hidden');
        answerButton.classList.add('notready');
        answerButton.hidden = false;

        clearCards();
        nextQuestion();
    } else {
        console.log('idk what happened !');
    }
});
