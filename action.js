$(function () {

    console.log("ready actions.js !");

    //----------------------- DASHBOARD

    // Activation des différents onglets du panneau
    function tabAction() {
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
    }

    // TABLEAU TYPE
    $('.btn-trash').click(function() {
        // on récupère les classe
        let classBtnTrash = $('.btn-trash').attr('class');
        // On obtient un tableau avec les différentes classes
        let items = classBtnTrash.split(' ');

        // On parcours le tableau et on conditionne sur la classe que l'on souhaite
        items.forEach(function(item){
            if(item === 'fa-trash-o') {
                $('.btn-trash').removeClass("fa-trash-o").addClass("fa-trash");
                $('.table-type td:eq(1), .table-type td:eq(2)').prev().css('text-decoration', 'line-through');
            }
            else {
                $('.btn-trash').removeClass("fa-trash").addClass("fa-trash-o");
                $('.table-type td:eq(1), .table-type td:eq(2)').prev().css('text-decoration', '');
            }
          });

    });


     // Affiche l'image avant l'upload
    // $(window).on('load', function (e) {
    //     function readURL(input) {
    //         if (input.files && input.files[0]) {
    //             var reader = new FileReader();

    //             reader.onload = function (e) {
    //                 $('#image-view').attr('src', e.target.result);
    //             }

    //             reader.readAsDataURL(input.files[0]);
    //         }
    //     }

    //     $('#file').change(function () {
    //         readURL(this);
    //     });
    // });

    // GO
    // tabAction();
});
