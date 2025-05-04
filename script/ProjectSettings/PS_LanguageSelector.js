document.addEventListener("DOMContentLoaded", function () {
  const language = getStoredLanguage() || getCurrentLanguage();

  document.querySelectorAll('.dropdown-content a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      event.preventDefault();
      const language = anchor.getAttribute('data-lang');
      updateLanguage(language);
      switch (language) {
        case "en":
          if (!url.includes("/en/")) {
            window.location.href = "../en/";
          }
          break;
        case "de":
          if (!url.includes("/de/")) {
            window.location.href = "../de/";
          }
          break;
        case "fr":
          if (!url.includes("/fr/")) {
            window.location.href = "../fr/";
          }
          break;
        case "lu":
          if (!url.includes("/lu/")) {
            window.location.href = "../lu/";
          }
          break;
      }
    });
  });

  document.querySelectorAll('.popup-box a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      event.preventDefault();
      const language = anchor.getAttribute('data-lang');
      updateLanguage(language);
      closeLanguagePopup();
    });
  });

  if (!language || language === "undefined") {
    console.log("No language cookie found, opening popup");
    openLanguagePopup();
    return;
  } else {
    updateLanguage(language);
  }
});