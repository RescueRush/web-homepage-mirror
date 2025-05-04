function showExplanation(message = "Input Explanation !") {
    const existing = document.querySelector('explanationWrapper');
    if (existing) existing.remove();

    // Create Explanation
    const explanationWrapper = document.createElement('div');
    explanationWrapper.className = 'explanationWrapper';
    const explanation = document.createElement('div');
    explanation.className = 'explanation';
    explanation.textContent = message;


    const container = document.querySelector('#cardscontainer'); 
    // Show Explanation
    explanationWrapper.appendChild(explanation);
    container.appendChild(explanationWrapper);

  }

  function removeExplanation() {
    const existing = document.querySelector('.explanationWrapper');
    console.log(existing);
    if (existing) existing.classList.add('active');
    setTimeout(() => {
      if (existing) existing.remove();
    }, 500);
    0
  }

  /*document.addEventListener("click", () => {
    removeExplanation();
  });*/