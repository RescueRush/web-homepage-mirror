// CSS content
const style = document.createElement("style");
style.textContent = `
    .cover-background {
        position : fixed;
        top: 0;
        left: 0;
        backdrop-filter: blur(5px);
        height: 100dvh;
        width: 100dvw;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100000;
        background-color: rgba(0,0,0,0.2);
    }
    .popup {
        background-color: rgba(0,0,0,0.8);
        padding: 48px;
        border-radius: 24px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 60vw;
    }
    
    .popup a {
        color: white;
        text-decoration: none;
        
        width: auto !important;
        height: 60px !important;
        display: flex;
        content: center;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin: -5px 0px 0px -7px;
    }

    .popup .button2{
    width: auto;
    padding: 0 24px 0 24px;
    border-radius: 12px;
    }

    .popup a:hover {
        color: black !important;
    }

    @media (max-width:1100px) {
        .popup a {
            width: 40dvw !important;
            height: 12dvw !important;
        }
    }
`;
document.head.appendChild(style);

// Create popup
function newPopup(ppMsg, btnMsg) {
    removePopup(); // Remove any existing popups
    const newDiv = document.createElement("div");

    // Html content
    newDiv.innerHTML = `
    <div class="cover-background">
        <div class="popup">
        <strong class="heading2" style="margin-bottom: 24px;">${ppMsg}</strong> 
        <button class="button2" onclick="removePopup()">${btnMsg} </button>
        </div>
    </div>
    `;
    document.body.appendChild(newDiv);
    return newDiv;
}

// Remove popup
function removePopup() {
    const divs = document.querySelectorAll('.cover-background');
    divs.forEach(div => div.remove());
}

// =============================================================================
// Explanation for the Popup Usage:
// =============================================================================
//
// Classical Usage :
//  newPopup("Message", "Button Message");
//
// Example :
//  newPopup("You were disconnected", "Accept");
//
// Additional function for a basic button :
//  newPopup("Message", '<a onclick="function();">Additional function</a>');
//
// Example with additional button with supplementary function :
//  newPopup("Message", "Close" + '<button class="button2" style="margin-top: 12px" onclick="removePopup(),function()"> Close + function() </button>');
//
// =============================================================================
// End of Explanation - For any questions, please contact me on Discord
// =============================================================================