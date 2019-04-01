$(function () {

    console.log("ready action_edit_modal.js !");

    // Valeur par défaut du bouton onOff:
    $('#btn-onoff-hidden').val('0');

    // Button On/Off - modal
    $('#button-on-off-modal-edit').click(function() {
        let classbuttonOnOff = $('#button-on-off-modal-edit').attr('class').substr(13);
        // console.log(classbuttonOnOff);
        if(classbuttonOnOff === 'btn-red') {
            $('#button-on-off-modal-edit').removeClass("btn-red").addClass("btn-green");
            $('#btn-onoff-hidden').val('1');
            let v1 = $('#btn-onoff-hidden').val();
            console.log(v1);
            // permet de voir la valeur du headline (true ou false)
            // console.log($('#headline-modal-add').is(':checked'));
        }
        else {
            $('#button-on-off-modal-edit').removeClass("btn-green").addClass("btn-red");
            $('#btn-onoff-hidden').val('0');
            let v2 =  $('#btn-onoff-hidden').val();
            console.log(v2);
        }
    });

    // Affiche l'image avant l'upload
    $('.modal').on('shown.bs.modal', function() {
        $('#thumbnail-modal-edit').change(function () {
            console.log("DEBUG");
            var fileList = $("#thumbnail-modal-edit").prop("files");
            console.log(fileList);
            console.log('Nom de l\'image:' + fileList[0].name);
        });

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#image-view-modal-edit').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        $('#thumbnail-modal-edit').change(function () {
            var fileList = $("#thumbnail-modal-edit").prop("files");
            readURL(this);
            $('#image-name-modal-edit').text(fileList[0].name);
        });
    });

    // Edit Modal
    // clic sur l'icone - ouvre la modal avec les infos sur le jeu
    $('.editIcon').click(function() {
        var id_game = $(this).parent().parent().parent().attr('id');
        console.log(id_game);

        console.log('clic');
        // Récupération des données à afficher dans la modal
        // $.ajax({
        //     url: '../../FindTeamMates/API/games_admin.php?update&id=' + id_game,
        //     type: 'GET',
        //     data:  'update',
        //     dataType: 'json',
        //     success: function (data) {
        //         console.log(data);
        //     },
        //     error: function() {}
        // });
        // $.get('../../FindTeamMates/API/games_admin.php',{
        //     id: idGame, 
        //     update: 'update',
        //     dataType: 'json'
        // }).done(function(data) {
        //     console.log(data);
        //     console.log(data.id_game);

        // });
    });

    $('#btn-validate-edit').click(function() {


    });

      // Envoie des datas à l'API en Ajax
      $("#form-edit").submit(function(e) {
        e.preventDefault();

        // on récupère les valeurs du form, que l'on met dans un objet FormData
        let myForm = document.getElementById('form-edit');
        var datas = new FormData(myForm);

        let headline = $('#headline-modal-edit').is(':checked');
        datas.set('headline', headline);
        
        let genre = $('#genre-modal-edit').val();
        datas.set('genre', genre);

        console.log("DATAS: "); console.log(datas);

        $.ajax(
        {
            url: "../../FindTeamMates/API/Administration/games.php",
            type: "POST",
            data:  datas,
            contentType: false,
            processData: false,

            beforeSend : function() {},

            success: function(data) {
                console.log("SUCCESS");
                if(data == 'invalid') {
                    // invalid file format.
                    // $("#err").html("Invalid File !").fadeIn();    
                }
                else {
                    // view uploaded file.
                    // $("#preview").html(data).fadeIn();
                    $("#form")[0].reset(); 
                }
            },

            error: function(e) {
                // $("#err").html(e).fadeIn();
                console.log("Failed");
                console.log(e);
            }   
        });

        $('#modalFormAdd').modal('toggle');
    });

    


});