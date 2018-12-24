$(function () {

    console.log("ready actions_tab_proposition.js !");

    $('#switch-proposition-tab').click(function() {
        let classbuttonOnOff = $('#switch-proposition-tab').attr('class').substr(13);
        // let idGame = $(this).parent().parent().attr('id');
        console.log(classbuttonOnOff);
        if(classbuttonOnOff == "btn-red") 
        {
            // Envoie une info comme quoi on peut effacer cette proposition
            // $.ajax({
            //     url: '../../FindTeamMates/API/games_admin.php',
            //     type: 'GET',
            //     data: {
            //         id: idGame, 
            //         switch: "switch-proposition-tab",
            //     },
            //     success: function (data) {
            //         console.log(data);
            //         if(classbuttonOnOff === 'btn-red') {
            //             $('#switch-proposition-tab').removeClass("btn-red").addClass("btn-green");
            //         }
            //         // else {
            //         //     $('#switch').removeClass("btn-green").addClass("btn-red");
            //         // }
            //     },
            //     error: function() {
            //         if(classbuttonOnOff === 'btn-green') {
            //             $('#switch-proposition-tab').removeClass("btn-green").addClass("btn-red");
            //         }
            //     }
            // });
            $('#switch-proposition-tab').removeClass("btn-red").addClass("btn-green");
        }
        else
        {
            $('#switch-proposition-tab').removeClass("btn-green").addClass("btn-red");
        }
    });
});
