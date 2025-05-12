document.addEventListener("DOMContentLoaded", function() {
    createDevBar();
});

let devBarText = 
{
    en: "🚧 This page is under development. ⚠️ Some features might not work. 🔄 Please check back later. 🛠️",
    fr :"🚧 Cette page est en cours de développement. ⚠️ Certaines fonctionnalités peuvent ne pas fonctionner. 🔄 Veuillez revenir plus tard. 🛠️",
    lu : "🚧 Dës Säit ass nach an Entwécklung. ⚠️ E puer Funktioune funktionéiere méiglecherweis nach net korrekt. 🔄 Kommt wgl. méi spéit erëm zeréck. 🛠️",
    de : "Diese Seite befindet sich noch in der Entwicklung. ⚠️ Einige Funktionen könnten noch nicht funktionieren. 🔄 Bitte schauen Sie später noch einmal vorbei. 🛠️"
};

function createDevBar() {
    const devBar = document.createElement("devBar");
    devBar.style = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: auto;
        display: flex;
        flex: wrap;
        padding : 10px 0 10px 0;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        z-index: 9999; /* Ensure it appears above other elements */
        font-family: Arial,sans-serif;
    `;
    devBar.innerHTML = `
        <p style="margin: 24px;">${devBarText[localStorage.getItem('language')]}</p>
    `;
    document.body.appendChild(devBar);
}