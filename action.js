$(function () {

    console.log("ready!");

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

    // Met le focus sur le premier input à l'ouverture de la modal
    $('.modal').on('shown.bs.modal', function () {
        $('#nameGame').focus()
    });

    // Affiche l'image avant l'upload
    $(window).on('load', function (e) {
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#image-view').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        $('#file').change(function () {
            readURL(this);
        });
    });

    // Efface le contenu du formulaire
    $('#empty-btn').on('click', function (e) {
        $("#nameGame").val('');
        $("#file").val('');
        $('#image-view').attr('src', 'img/event_no_image.png');
    });






    // GO
    // tabAction();
});

// function preview(filename){
//     $('#image-view').innerHTML='<img src="file://'+filename+'" width="200px" height="auto"/>';
// }