$('#sidebar-toggle').on('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    $('#main-sidebar').toggleClass('off-canvas');
});
