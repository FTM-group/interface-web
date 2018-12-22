$(function () {

    console.log("ready action_edit_modal.js !");

    // Button On/Off - modal
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
    // clic sur l'icone - ouvre la modal avec les infos sur le jeu
    $('#icon-edit').click(function() {
        var id_game = $(this).parent().parent().parent().attr('id');
        console.log(id_game);
        // Récupération des données à afficher dans la modal
        $.ajax({
            url: '../../FindTeamMates/API/games_admin.php?update&id=' + id_game,
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

    


});