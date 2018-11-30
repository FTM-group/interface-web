$(function() {

    console.log( "ready!" );

    $('#listGame-tab a').on('click', function (e) {
        e.preventDefault()
        console.log("OK");
        $(this).tab('show');
    });
    
    $('#proposition-tab a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    
    $('#addGame-tab a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    
    $('#ipList-tab a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

});

