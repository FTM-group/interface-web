$(function () {

    console.log("ready actions_tab_listGame.js !");

    // Icon On/Off - tableau
    $('#switch').click(function() {
        let classbuttonOnOff = $('#switch').attr('class').substr(13);
        let idGame = $(this).parent().parent().attr('id');

        if(classbuttonOnOff == "btn-red") 
        {
            // je vais chercher les infos à afficher dans la modal
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
        }
        else
        {
            $('#switch').removeClass("btn-green").addClass("btn-red");
        }
    });
});
