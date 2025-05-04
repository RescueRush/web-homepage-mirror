document.addEventListener('mousemove', function(e) {
    if (window.innerWidth > 768) { // Check if the device width is greater than 768px
        const cursor = document.getElementById('custom-cursor');
        cursor.style.left = `${e.pageX - cursor.offsetWidth / 2}px`;
        cursor.style.top = `${e.pageY - cursor.offsetHeight / 2}px`;
    }
});
