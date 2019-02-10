$(function () {

    console.log("ready actions_tab_listGame.js !");

    // Icon On/Off - tableau -> PAS DE RECUPERATION DES DONNEES cf. Model/game.php
    $('.tdSwitch').has('i').click(function() {
        console.log('clic');


        // let classbuttonOnOff = $('#tab-listGame, tr, td, i').attr('class').substr(20);
        // let idGame = $(this).parent().parent().attr('id');
        // console.log(classbuttonOnOff);

        // if(classbuttonOnOff == "btn-red") 
        // {
            // je vais chercher les infos à afficher dans la modal
            // $.ajax({
            //     url: '../../FindTeamMates/API/Administration/games.php',
            //     type: 'POST',
            //     data: {
            //         id: idGame, 
            //         switch: "switch",
            //     },
            //     success: function (data) {
            //         console.log(data);
            //         if(classbuttonOnOff === 'btn-red') {
            //             $('.fa.fa-square.switch.btn-red').removeClass("btn-red").addClass("btn-green");
            //         }
            //         // else {
            //         //     $('.fa.fa-square.switch.btn-red').removeClass("btn-green").addClass("btn-red");
            //         // }
            //     },
            //     error: function() {
            //         if(classbuttonOnOff === 'btn-green') {
            //             $('.fa.fa-square.switch.btn-red').removeClass("btn-green").addClass("btn-red");
            //         }
            //     }
            // });
        // }
        // else
        // {
        //     $('#switch').removeClass("btn-green").addClass("btn-red");
        // }
    });

    // Alimentation du tableau 'Liste des jeux'
    $(document).ready(function() {
        $.ajax(
            {
                url: "../../FindTeamMates/API/Administration/games.php",
                type: "GET",
                data:  'getall',
                // dataType: 'content',
                dataType: 'json',
                // cache: false,
                // processData: false,
                
                success: function(data) {
                    console.log("SUCCESS listGames: ");
                    console.log(data);

                    let datas = data.games;
                    let i = 0;

                    $.each(datas, function() {
                        // $('<tr id="' + datas[i].id_game + '">').appendTo('#tab-listGame');
                        // $('<th scope="row">' + (i+1) + '</th>').appendTo('#tab-listGame');
                        // $('<td>', { html: datas[i].name_game + '</td>' }).appendTo('#tab-listGame');
                        // $('<td>', { html: datas[i].genres.name_genre + '</td>' }).appendTo('#tab-listGame');
                        // $('<td>', { html: datas[i].name_thumbnail + '</td>' }).appendTo('#tab-listGame');
                        // $('<td style="text-align: center;">' + datas[i].nb_players[0].nb_players + '</td>').appendTo('#tab-listGame');
                        // // $('<td>', { html: datas[i].nb_players[0].nb_players + '</td>' }).appendTo('#tab-listGame');
                        // $('<td>', { html: datas[i].headline_game + '</td>' }).appendTo('#tab-listGame');
                        // $('<td>', { html: datas[i].date_add_game + '</td>' }).appendTo('#tab-listGame');
                        // $('<td><span data-toggle="modal" data-target="#modalFormEdit"><i id="icon-edit" class="fa fa-edit" style="color: #3399ff;"></i></span></td>').appendTo('#tab-listGame');
                        // $('<td><i class="fa fa-square switch btn-red"></i></td>').appendTo('#tab-listGame').appendTo('#tab-listGame');
                        // $('</tr>').appendTo('#tab-listGame').appendTo('#tab-listGame');

                        let headlineGame = 'non';
                        if(datas[i].headline_game === "1") {
                            headlineGame = 'oui';
                        }

                        $('<tr id="' + datas[i].id_game + '"> ' +
                        '<th scope="row">' + (i+1) + '</th>' +
                        '<td>' + datas[i].name_game + '</td>' +
                        '<td>' + datas[i].genres.name_genre + '</td>' +
                        '<td>' + datas[i].name_thumbnail + '</td>' +
                        '<td style="text-align: center;">' + datas[i].nb_players[0].nb_players + '</td>' +
                        '<td style="text-align: center;">' + headlineGame + '</td>' +
                        '<td style="text-align: center;">' + datas[i].date_add_game + '</td>' +
                        '<td><span data-toggle="modal" data-target="#modalFormEdit"><i id="icon-edit" class="fa fa-edit" style="color: #3399ff;"></i></span></td>' +
                        '<td class="tdSwitch"><i class="fa fa-square switch btn-red"></i></td>').appendTo('#tab-listGame');

                        i++;
                    });
                },
                error: function(e) {
                    console.log("Failed");
                }   
            });
        

    });

});
