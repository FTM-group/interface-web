$(function () {

    console.log("ready action_add_modal.js !");

    // Met le focus sur le premier input à l'ouverture de la modal
    $('.modal').on('shown.bs.modal', function() {
        $('#name-modal-add').focus()
    });

    // Affiche l'image avant l'upload
    $('.modal').on('shown.bs.modal', function() {
        $('#thumbnail-modal-add').change(function () {
            console.log("DEBUG");
            var fileList = $("input[type=file]").prop("files");
            console.log(fileList);
            console.log('Nom de l\'image:' + fileList[0].name);
        });

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#image-view-modal-add').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        $('#thumbnail-modal-add').change(function () {
            var fileList = $("input[type=file]").prop("files");
            readURL(this);
            $('#image-name-modal-add').text(fileList[0].name);
        });
        
    });

    // Button On/Off - modal
    $('#button-on-off-modal-add').click(function() {
        let classbuttonOnOff = $('#button-on-off-modal-add').attr('class').substr(13);
        console.log(classbuttonOnOff);
        if(classbuttonOnOff === 'btn-red') {
            $('#button-on-off-modal-add').removeClass("btn-red").addClass("btn-green");
        }
        else {
            $('#button-on-off-modal-add').removeClass("btn-green").addClass("btn-red");
        }
    });

    // Efface le contenu du formulaire
    $('#empty-btn').on('click', function(e) {
        $("#name-modal-add").val('');
        $("#thumbnail-modal-add").val('');
        $('#image-view-modal-add').attr('src', 'img/event_no_image.png');
        $('#image-name-modal-add').text('');
        $('#button-on-off-modal-add').removeClass("btn-green").addClass("btn-red");
        $('#genre-modal-add').val('');
        $('#numberPlayers-modal-add').val('');
        if($('#headline-modal-add').is(':checked')) {
            $('#headline-modal-add').prop('checked', false);  
        }
    });


    


});