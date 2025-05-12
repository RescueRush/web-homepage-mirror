fullscreenRequest = false;

document.addEventListener("click", () => {
    if(!fullscreenRequest){
        document.documentElement.requestFullscreen();
        fullscreenRequest = true;
    }
});
