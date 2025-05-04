$(function () {
    if (window.innerWidth > 768) { // Check if the device width is greater than 768px
        // Targeting hover on links (a tags)
        $("a").hover(
            function () {
                $("#custom-cursor").addClass("custom-cursoronhovered");
            },
            function () {
                $("#custom-cursor").removeClass("custom-cursoronhovered");
            }
        );

        // Targeting hover on checkboxes
        $("input[type='checkbox']").hover(
            function () {
                $("#custom-cursor").addClass("custom-cursoronhovered");
            },
            function () {
                $("#custom-cursor").removeClass("custom-cursoronhovered");
            }
        );
    }
});

