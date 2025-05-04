function calcAnswers(){
    const cards = document.querySelectorAll(`#answers input`);
    let selectedCards = 0;
    cards.forEach(card => {
        if(card.checked){
            selectedCards |= 1 << card.id;
            card.checked = false;
        }
    });
    return selectedCards;
}

function get_Desc(){
    const map = new Map();
    document.querySelectorAll(`#descriptions input`).forEach(desc => {
        map.set(desc.id, desc.value);
    });
    return map;
}

function calcPoints(){
    let cardCount = 0;
    if(points.length === 0){
        document.querySelectorAll(`#answers input`).forEach(e => cardCount++);
        return cardCount*10;
    } else {
        return Number(document.getElementById(`points`).value);
    }
}

document.getElementById(`insertBtn`).addEventListener(`click`, () => {
    const body = get_Desc();
    body.set(`answers`, calcAnswers());
    body.set('points', calcPoints());
    document.querySelectorAll(`#descriptions input`).forEach(i => {
        i.value = ``;
    });
    request(`POST`, `/admin/question/insert`, body).catch(e => {
        document.getElementById(`statusLbl`).value=`An error occurred!`;
    }).then(s => {
        document.getElementById(`statusLbl`).value=`Successfully inserted question`;
    })
});