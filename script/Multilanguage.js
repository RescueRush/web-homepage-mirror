document.addEventListener("DOMContentLoaded", function () {
    let language = getStoredLanguage();
    console.log("loaded language:", language);

    if ((!language || language === "undefined") && window.location.pathname != "/") {
        console.log("No language cookie found, redirecting to root: ", window.location.pathname.replace("index.html", ""));
        window.location.href = "/?to=" + window.location.pathname.replace("index.html", "");
        return;
    }

    // Get the 'to' parameter from the URL, defaulting to '/'
    const urlParams = new URLSearchParams(window.location.search);
    const to = urlParams.get('to') || window.location.pathname.replace("index.html", "");  // If 'to' is not provided, default to root '/'
    language = urlParams.get('lang') || language;

    document.querySelectorAll('.dropdown-content a').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const language = anchor.getAttribute('data-lang');
            updateLanguage(language);

            const redirectTo = `${to}/${language}/`.replace(/\/+/g, '/');
            console.log("Redirecting to:", redirectTo, " for url: ", window.location.href);

            if (!window.location.href.includes(redirectTo)) {
                window.location.href = redirectTo;
            }
        });
    });

    document.querySelectorAll('.popup-box a').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const language = anchor.getAttribute('data-lang');
            updateLanguage(language);

            const redirectTo = `${to}/${language}/`.replace(/\/+/g, '/');
            console.log("Redirecting to:", redirectTo, " for url: ", window.location.href);

            if (!window.location.href.includes(redirectTo)) {
                window.location.href = redirectTo;
            }
        });
    });

    if (!language || language === "undefined") {
        console.log("No language cookie found, opening popup");
        openLanguagePopup();
    } else if (window.location.pathname.replace("index.html", "") == "/" && to !== "/") {
        console.log("Redirecting to:", to, " for url: ", window.location.pathname);
        setStoredLanguage(language);
        window.location.href = to;
    } else {
        updateLanguage(language);
    }
});
