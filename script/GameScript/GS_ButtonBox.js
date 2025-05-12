addButtonBox();
function addButtonBox() {
    buttonBoxContainer = document.querySelector('.above_placer');
    const width = window.innerWidth;

    buttonBox = document.querySelector('.buttonbox');
    if (!buttonBox) {
    buttonBox = document.createElement('div');
    buttonBox.className = 'buttonbox';
    buttonBox.innerHTML = `
        <div class="dropdown">
                    <!--<button class="hintBox" title="Card Explanations" onclick="showMaterialList()">
                        <img src="../../images/cardicon/materials.webp" alt="Hint" class="dropdown-icon"> </button>-->
                </div>
                <a href="../menu/" title="Disconnect">
                    <button class="exit-button">
                        <img src="../../../images/Icons/Disconnect.webp" class="logger-icon">
                    </button>
                </a>
                <button id="answer-btn" class="notready">VERIFY</button>
                <button id="next-question-btn" class="hidden">NEXT</button>
    `;}
    
    
    if (width < 1100) {
        buttonBoxContainer = document.querySelector('#mainCasual');
    } else {
        buttonBoxContainer = document.querySelector('.above_placer');
    }
    buttonBoxContainer.appendChild(buttonBox);

}


window.addEventListener('resize', () => {
  addButtonBox();
});