const answerChoices = document.querySelectorAll('#cardscontainer button');
const answerButton = document.getElementById('answer-btn');
const nextquestbtn = document.getElementById('next-question-btn');

answerButton.addEventListener('click', () => {
    if (answerButton.classList.contains('activated')) {

        answerButton.classList.add('notready');
        answerButton.classList.remove('activated');
        answerButton.classList.add('hidden');

        nextquestbtn.classList.remove('hidden');
        nextquestbtn.classList.add('activated');

        playRound();
    } else {
        console.log('Please select an answer !');
    }
});

nextquestbtn.addEventListener('click', () => {
    if (nextquestbtn.classList.contains('activated')) {

        nextquestbtn.classList.add('hidden');
        nextquestbtn.classList.remove('activated');

        answerButton.classList.remove('hidden');
        answerButton.classList.add('notready');
        answerButton.hidden = false;

        clearAnswers();
        nextQuestion();
    } else {
        console.log('idk what happened !');
    }
});
