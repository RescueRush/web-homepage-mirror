
// English
let materialDescEN = [
    "The <strong>bandage</strong> secures a compress on a large wound or stabilizes injuries, such as a sprained ankle.",
    "A <strong>plaster</strong> can be used for small wounds. It should be applied in such a way that only the white pad of the plaster comes into contact with the wound.",
    "Whenever treating a patient with an open wound, it is important to put on <strong>gloves</strong> first to protect yourself from diseases that can be transmitted through blood.",
    "The <strong>compress</strong> is used when a wound is too large for a plaster. The compress is placed on the wound and secured with a bandage to keep it in place.",
    "If the patient cannot be treated on site, the patient must be taken to the <strong>hospital</strong>.",
    "The <strong>cold pack</strong> helps relieve pain and reduce swelling in the case of bruises or sprains. A cold pack must always be used with a triangular bandage or a kitchen towel to avoid direct contact with the skin.",
    "The <strong>emergency blanket</strong> helps to warm up a person. It is important that the patient is not wet. The patient should be well wrapped, and the silver side of the blanket should be facing inward.",
    "A <strong>triangular bandage</strong> has many different functions. It can be used to stabilize an arm if it is broken. It can also be wrapped around a cold pack to protect the skin from getting too cold."
];

let materialDescDE = [
    "Der <strong>Verband</strong> fixiert eine Kompresse auf einer großen Wunde oder stabilisiert Verletzungen, wie zum Beispiel bei einem umgeknickten Knöchel.",
    "Ein <strong>Pflaster</strong> kann für kleine Wunden verwendet werden. Das Pflaster wird so aufgeklebt, dass nur das weiße Polster die Wunde berührt.",
    "Immer, wenn man einen Patienten mit einer offenen Wunde behandelt, sollte man zuerst <strong>Handschuhe</strong> anziehen, um sich vor möglichen Krankheiten zu schützen, die über das Blut übertragen werden.",
    "Die <strong>Kompressen</strong> werden verwendet, wenn eine Wunde zu groß für ein Pflaster ist. Sie wird auf die Wunde gelegt und der Verband wird darum gewickelt, um die Kompresse zu fixieren.",
    "Wenn er nicht vor Ort behandelt werden kann, muss der Patient ins <strong>Krankenhaus</strong> gebracht werden.",
    "Das <strong>Kältepack</strong> hilft bei Prellungen oder Verstauchungen gegen den Schmerz und gegen die Schwellung. Ein Kältepack muss immer mit einem Dreiecktuch oder einem Küchentuch verwendet werden, um direkten Hautkontakt zu vermeiden.",
    "Die <strong>Rettungsdecke</strong> hilft, eine Person wieder aufzuwärmen. Es ist wichtig, dass der Patient nicht nass ist. Der Patient sollte gut eingewickelt werden, und die silberne Seite muss nach innen gedreht werden.",
    "Ein <strong>Dreiecktuch</strong> hat viele verschiedene Funktionen. Es kann verwendet werden, um einen Arm zu stabilisieren, wenn er gebrochen ist. Es kann aber auch um ein Kältepack gewickelt werden, damit die Haut nicht zu kalt wird."
];

let materialDescLU = [
    "De <strong>Verband</strong> fixéiert eng Kompress op enger grousser Wonn oder stabiliséiert Verletzungen, wéi zum Beispill bei engem ëmgeknéckste Knéchel.",
    "Eng <strong>Plooschter</strong> kann ee fir kleng Wonne benotzen. D’Plooschter gëtt dofir esou opgepecht, dass just dee wäisse Polster vun der Plooschter d’Wonn beréiert.",
    "Ëmmer, wann een e Patient mat enger oppener Wonn behandelt, soll ee fir d’éischt <strong>Händschen</strong> undoen, fir sech viru méigleche Krankheeten, déi iwwert d’Blutt iwwerdroe ginn, ze schützen.",
    "D’<strong>Kompresse</strong> gi benotzt, wann eng Wonn ze grouss fir eng Plooschter ass. Se gëtt op d’Wonn geluecht an de Verband ronderëm gewéckelt, fir d’Kompress ze befestegen.",
    "Wann en net op der Plaz behandelt ka ginn, muss de Patient an d’<strong>Klinick</strong> gefouert ginn.",
    "De <strong>Killpak</strong> hëlleft bei Prellungen oder Verstauchunge géint de Wéi a géint d’Schwellung. E Killpak muss ëmmer mat engem Dräiecksduch oder engem Kichenduch benotzt gi fir direkten Hautkontakt ze vermeiden.",
    "D’<strong>Rettungsdecken</strong> hëlleft, eng ënnerkillte Persoun nees opzewiermen. Et ass wichteg, dass de Patient net naass ass. De Patient soll gutt agewéckelt ginn, an déi sëlwereg Säit muss no banne gedréint ginn.",
    "En <strong>Dräiecksduch</strong> huet vill verschidde Funktiounen. Et ka benotzt ginn, fir en Aarm ze stabiliséieren, wann e gebrach ass. Et kann awer och ronderëm e Killpak gewéckelt ginn, fir dass d’Haut net ze kal gëtt."
];

let materialDescFR = [
    "Le <strong>bandage</strong> fixe une compresse sur une grande plaie ou stabilise des blessures, comme par exemple une cheville foulée.",
    "Un <strong>pansement</strong> peut être utilisé pour de petites blessures. Le pansement doit être appliqué de manière à ce que seule la partie blanche touche la blessure.",
    "Chaque fois que l'on traite un patient avec une blessure ouverte, il est important de mettre des <strong>gants</strong> d'abord, afin de se protéger contre les maladies qui peuvent être transmises par le sang.",
    "Les <strong>compresses</strong> sont utilisées lorsqu'une blessure est trop grande pour un pansement. Elle est placée sur la blessure et fixée avec un bandage pour maintenir la compresse en place.",
    "S'il ne peut pas être traité sur place, le patient doit être transporté à l'<strong>hôpital</strong>.",
    "La <strong>compresse froide</strong> aide à soulager la douleur et réduire l'enflure en cas de contusions ou de foulures. Une compresse froide doit toujours être utilisée avec une écharpe triangulaire ou un torchon de cuisine pour éviter le contact direct avec la peau.",
    "La <strong>couverture de sauvetage</strong> aide à réchauffer une personne. Il est important que le patient ne soit pas mouillé. Le patient doit être bien enveloppé, et le côté argenté de la couverture doit être tourné vers l'intérieur.",
    "Une <strong>écharpe triangulaire</strong> a de nombreuses fonctions différentes. Elle peut être utilisée pour stabiliser un bras en cas de fracture. Elle peut également être enroulée autour d'une compresse froide pour protéger la peau du froid."
];


let materialDesc;

function loadMaterialsList() {
    // Select the language  
    lang = getStoredLanguage();
    switch (lang) {
        case 'en': materialDesc = materialDescEN; break;
        case 'fr': materialDesc = materialDescFR; break;
        case 'de': materialDesc = materialDescDE; break;
        case 'lu': materialDesc = materialDescLU; break;
        default: alert("Language not set!"); break;
    }

    // Create the materials list
    const materialList = document.querySelector('.materialList');
    materialList.innerHTML = ''; // Clear existing content
    for (let i = 0; i < materialDesc.length; i++) {
        const materialDiv = document.createElement('div');
        materialDiv.classList.add('material');
        materialDiv.innerHTML = `
          <img src="../../images/cardicon/${i}.svg" alt="Material ${i}">
          <p id="materialhint${i}">${materialDesc[i]}</p>
        `;
        materialList.appendChild(materialDiv);
    }
}
isMaterialListActive = true;

function removeMaterialList() {
    if (isMaterialListActive) {
        isMaterialListActive = false;
        const existing = document.querySelector('.materialList');
        if (existing) existing.classList.add('active');
        setTimeout(() => {
            existing.style.display = 'none';
        }, 500);
    }
}

function showMaterialList(index = null) {
    const materialList = document.querySelector('.materialList');
    materialList.innerHTML = ''; // Clear existing content

    if (index !== null && index >= 0 && index < materialDesc.length) {
        // Show only the selected material
        const materialDiv = document.createElement('div');
        materialDiv.classList.add('material');
        materialDiv.innerHTML = `
          <img src="../../images/cardicon/${index}.svg" alt="Material ${index}">
          <p id="materialhint${index}">${materialDesc[index]}</p>
        `;
        materialList.appendChild(materialDiv);
    } else {
        // Show all materials if no index is provided
        for (let i = 0; i < materialDesc.length; i++) {
            const materialDiv = document.createElement('div');
            materialDiv.classList.add('material');
            materialDiv.innerHTML = `
              <img src="../../images/cardicon/${i}.svg" alt="Material ${i}">
              <p id="materialhint${i}">${materialDesc[i]}</p>
            `;
            materialList.appendChild(materialDiv);
        }
    }

    if (!isMaterialListActive) {
        setTimeout(() => {
            isMaterialListActive = true;
            materialList.style.display = 'flex';
            materialList.classList.remove('active');
        }, 100);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadMaterialsList();
    showMaterialList();
    document.querySelector('.materialList').style.display = 'none';
    showMaterialList(10);
    removeMaterialList();
});

document.addEventListener("click", () => {
    removeMaterialList();
});



