$(function () {

    console.log("ready!");

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

    // Icon On/Off - tableau
    $('#switch').click(function() {
        let classbuttonOnOff = $('#switch').attr('class').substr(13);
        let idGame = $(this).parent().parent().attr('id');
        
        $.ajax({
            url: '../../FindTeamMates/API/games_admin.php',
            type: 'POST',
            data: {
                id: idGame, 
                switch: "switch",
            },
            success: function (data) {
                console.log(data);
                if(classbuttonOnOff === 'btn-red') {
                    $('#switch').removeClass("btn-red").addClass("btn-green");
                }
                // else {
                //     $('#switch').removeClass("btn-green").addClass("btn-red");
                // }
            },
            error: function() {
                if(classbuttonOnOff === 'btn-green') {
                    $('#switch').removeClass("btn-green").addClass("btn-red");
                }
            }
        });
    });

    // Button On/Off -modal
    $('#button-on-off').click(function() {
        let classbuttonOnOff = $('#button-on-off').attr('class').substr(13);
        console.log(classbuttonOnOff);
        if(classbuttonOnOff === 'btn-red') {
            $('#button-on-off').removeClass("btn-red").addClass("btn-green");
        }
        else {
            $('#button-on-off').removeClass("btn-green").addClass("btn-red");
        }
    });

    // Edit Modal
    $('#icon-edit').click(function() {
        var id_game = $(this).parent().parent().parent().attr('id');
        console.log(id_game);
        $.ajax({
            url: '../../FindTeamMates/API/games_admin.php?update&id=' +id_game,
            type: 'GET',
            success: function (data) {
                console.log(data);
            },
            error: function() {}
        });
        // $.get('../../FindTeamMates/API/games_admin.php',{id: idGame, update: 'update'})
        //     .done(function( data ) {
        //     console.log(data);
        // });
    });

    $('#btn-validate-edit').click(function() {


    });

    //----------------------- MODAL ADD

    // Met le focus sur le premier input à l'ouverture de la modal
    $('.modal').on('shown.bs.modal', function() {
        $('#name').focus()
    });

    // Affiche l'image avant l'upload
    $('.modal').on('shown.bs.modal', function() {
        $('#thumbnail').change(function () {
            console.log("DEBUG");
            var fileList = $("input[type=file]").prop("files");
            console.log(fileList);
            console.log('Nom de l\'image:' + fileList[0].name);
        });

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#image-view').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        $('#thumbnail').change(function () {
            var fileList = $("input[type=file]").prop("files");
            readURL(this);
            $('#image-name').text(fileList[0].name);
        });
        
    });

    // Efface le contenu du formulaire
    $('#empty-btn').on('click', function(e) {
        $("#name").val('');
        $("#thumbnail").val('');
        $('#image-view').attr('src', 'img/event_no_image.png');
    });

    //----------------------- MODAL EDIT







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
