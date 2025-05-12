(function () {
    // Create style
    const style = document.createElement('style');
    style.textContent = `
    .throbber {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      will-change: transform;
    }

    .throbber .circle {
      width: 100%;
      height: 100%;
      border: 5px solid transparent;
      border-top: 5px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      will-change: transform;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
    document.head.appendChild(style);

    // Create throbber element
    const throbberEl = document.createElement('div');
    throbberEl.className = 'throbber';
    throbberEl.style.display = 'none';
    throbberEl.innerHTML = `<div class="circle"></div>`;
    document.body.appendChild(throbberEl);

    // Expose global function
    window.showThrobber = function () {
        throbberEl.style.display = 'flex';
    };

    window.hideThrobber = function () {
        throbberEl.style.display = 'none';
    };
})();