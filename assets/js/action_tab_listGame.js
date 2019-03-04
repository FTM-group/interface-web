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
                    '<td><span data-toggle="modal" data-target="#modalFormEdit"><i id="icon-edit" class="fa fa-edit editIcon" style="color: #3399ff;"></i></span></td>' +
                    '<td><i class="fa fa-square switch ' + classBtn + '"></i></td>').appendTo('#tab-listGame');

                    i++;   
                });

                $('.editIcon').click(function() {
                    var id_game = $(this).parent().parent().parent().attr('id');
                    console.log(id_game);

                    // $.get('../../FindTeamMates/API/Administration/games.php',{
                    //     update: 'update', 
                    //     id: id_game,
                    //     dataType: 'json'
                    // }).done(function( data ) {
                    //     console.log(data);
                    // });
                    $.ajax({
                        url:  '../../FindTeamMates/API/Administration/games.php',
                        type: 'GET',
                        data: {update: 'update', id: id_game},
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            let datas = data.games[0];

                            // Nom du jeu
                            $('#name-modal-edit').val(datas.name_game);

                            // Image du jeu
                            $('#image-view-modal-edit').attr('src', '../../FindTeamMates/API/Administration/Thumbnails/' + datas.name_thumbnail);
                            
                            // Nombre de joueurs
                            $('#numberPlayers-modal-edit').val(datas.nb_players[0].nb_players);
                            console.log('nbr players: ' + datas.nb_players[0].nb_players);

                            // Headline
                            let headlineValue = datas.headline_game;
                            if(headlineValue == 0)
                                $('#headline-modal-edit').prop('checked', false);
                            if(headlineValue == 1)
                                $('#headline-modal-edit').prop('checked', true);

                            // Bouton on/off
                            // let classbuttonOnOff = $('#button-on-off-modal-edit').attr('class').substr(13);
                            let btnOnOffValue = datas.on_off_game;
                            if(btnOnOffValue == 0)
                                $('#button-on-off-modal-edit').removeClass("btn-green").addClass("btn-red");
                            if(btnOnOffValue == 1)
                                $('#button-on-off-modal-edit').removeClass("btn-red").addClass("btn-green");

                            // 
                            
                        },
                        error: function() {}
                    });
                   
                });

                // NE MARCHE PAS
                // $(".modal").on('hidden.bs.modal', function () {
                //     $(this).data('bs.modal', null);
                // });

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
