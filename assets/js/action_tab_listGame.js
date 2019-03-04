$(function () {

    console.log("ready actions_tab_listGame.js !");

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
                    let classBtn = 'btn-red';
                    if(datas[i].on_off_game === "1") {
                        classBtn = 'btn-green';
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
                    '<td><i class="fa fa-square switch ' + classBtn + '"></i></td>').appendTo('#tab-listGame');

                    i++;
                });

                // Icon On/Off - tableau -> PAS DE RECUPERATION DES DONNEES cf. Model/game.php
                $('.switch').click(function() {
                    console.log('clic');
                    let icon = $(this);
                    let classbuttonOnOff = icon.attr('class').substr(20);
                    let idGame = icon.parent().parent().attr('id');
                    console.log(classbuttonOnOff); 
                    // console.log(typeof idGame);
                 
                    // je vais chercher les infos à afficher dans la modal
                    $.ajax({
                        url: '../../FindTeamMates/API/Administration/games.php',
                        type: 'POST',
                        data: {
                            id: idGame, 
                            switch: "switch",
                        },
                        dataType: 'json',
                        success: function (data) {
                            console.log(data.status);
                            if(data.status == 'success' && classbuttonOnOff == 'btn-red') {
                                icon.removeClass("btn-red").addClass("btn-green");
                                console.log(icon);
                            }
                            if(data.status == 'success' && classbuttonOnOff == 'btn-green') {
                                icon.removeClass("btn-green").addClass("btn-red");
                            }
                        },
                        error: function() {}
                    });
                  
                });
            },
            error: function(e) {
                console.log("Failed");
            }   
        });
    });

       

});
