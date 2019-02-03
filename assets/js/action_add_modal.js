$(function () {

    console.log("ready action_add_modal.js !");
    
    // Valeur par défaut du bouton onOff:
    $('#btn-onoff-hidden').val('0');

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
        // console.log(classbuttonOnOff);
        if(classbuttonOnOff === 'btn-red') {
            $('#button-on-off-modal-add').removeClass("btn-red").addClass("btn-green");
            $('#btn-onoff-hidden').val('1');
            let v1 = $('#btn-onoff-hidden').val();
            // console.log(v1);
            // permet de voir la valeur du headline (true ou false)
            // console.log($('#headline-modal-add').is(':checked'));
        }
        else {
            $('#button-on-off-modal-add').removeClass("btn-green").addClass("btn-red");
            $('#btn-onoff-hidden').val('0');
            let v2 =  $('#btn-onoff-hidden').val();
            // console.log(v2);
        }
    });

    // Efface le contenu du formulaire
    $('#empty-btn').on('click', function(e) {
        $("#name-modal-add").val('');
        $("#thumbnail-modal-add").val('');
        $('#image-view-modal-add').attr('src', 'img/event_no_image.png');
        $('#image-name-modal-add').text('');
        $('#button-on-off-modal-add').removeClass("btn-green").addClass("btn-red");

        // $("#genre-modal-add").selectpicker("render");
        // $(".selectpicker option").eq(0).remove();

        if($('#headline-modal-add').is(':checked')) {
            $('#headline-modal-add').prop('checked', false);  
        }
    });

    // Alimentation du SELECT Genre
    $('#modalFormAdd').ready(function() {
        console.log('READY MODAL ADD');
        $.ajax(
        {
            url: "../../FindTeamMates/API/Administration/genres.php", // "test/ajaxupload.php",
            type: "GET",
            data:  'all',
            dataType: 'json',
            // cache: false,
            // processData: false,
            
            success: function(data) {
                console.log("SUCCESS select genre");
                console.log(data);
                    
                let json = JSON.parse(data);
                console.log(json); 
                // json = json.replace(/["]+/g, '\'');
                console.log(json.status); 
               
                // json.data.forEach(function(e) {
                //     console.log(e.id_genre);
                // });
                // $.each(data, function(key, value) {
                //     $('<option>',  {value: key, html: value + '</option>' }).appendTo('#genre-modal-add');
                // });
                $.each(json.data, function(key, value) {
                    // console.log(value.id_genre); 
                    // console.log(value.name_genre);
                    // $(".selectpicker").selectpicker();
                    // $("#genre-modal-add").append('<option value="'+value.id_genre+'">'+value.name_genre+'</option>');
                    $('<option>', {value: value.id_genre, html: value.name_genre + '</option>' }).appendTo('#genre-modal-add');
                    $('.selectpicker').selectpicker('refresh');
                });
                
                // $('#genre-modal-add').selectpicker('refresh');
            },
            
            error: function(e) {
                // $("#err").html(e).fadeIn();
                console.log("Failed");
                console.log(e);
            }   
        });
    });

    // Penser à faire un controle sur nbr de joueurs afin que l'on ne puisse saisir que des chiffres

    // Envoie des datas à l'API en Ajax
    $("#form").submit(function(e) {
        e.preventDefault();

        // on récupère les valeurs du form, que l'on met dans un objet FormData
        let myForm = document.getElementById('form');
        var datas = new FormData(myForm);

        let headline = $('#headline-modal-add').is(':checked');
        datas.set('headline', headline);
        
        let genre = $('#genre-modal-add').val();
        datas.set('genre', genre);

        console.log("DATAS: "); console.log(datas);

        //---> 2e solution - Essayer de comprendre pourquoi cela n'a pas marché...
        // let dataSynthesis = new Object();

        // // on parcours l'objet formData
        // // afin de récupérer sa valeur thumbnail et la mettre dans dataSynthesis
        // for(var pair of datas.entries()) {
        //     // console.log(pair[0] + ', ' + pair[1]);
        //     if(pair[0] === 'thumbnail') {
        //         dataSynthesis.thumbnail2 = pair[1];
        //     }
        // }

        // // Construction d'un objet dataSynthesis pour l'ajax
        // dataSynthesis.name         = $('#name-modal-add').val();
        // dataSynthesis.thumbnail    = $('#thumbnail-modal-add')[0].files[0];
        // dataSynthesis.genre        = $('#genre-modal-add').val();
        // dataSynthesis.nbMaxPlayers = $('#numberPlayers-modal-add').val();
        // dataSynthesis.headline     = $('#headline-modal-add').is(':checked');
        // dataSynthesis.onOff        = $('#btn-onoff-hidden').val();

        // console.log("datasSynt: "); console.log(dataSynthesis);
        
        $.ajax(
        {
            url: "../../FindTeamMates/API/Administration/games.php", // "test/ajaxupload.php",
            type: "POST",
            data:  datas,
            contentType: false,
            // cache: false,
            processData: false,

            beforeSend : function() {
                //$("#preview").fadeOut();
                // $("#err").fadeOut();
            },

            success: function(data) {
                console.log("SUCCESS ");
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

    // PAS UTILE
    // $('#btn-validate').click(function(e) {
    //     let dataSynthesis = new Object();

    //     dataSynthesis.name         = $('#name-modal-add').val();
    //     dataSynthesis.thumbnail    = $('#thumbnail-modal-add')[0].files[0];
    //     dataSynthesis.genre        = $('#genre-modal-add').val();
    //     dataSynthesis.nbMaxPlayers = $('#numberPlayers-modal-add').val();
    //     dataSynthesis.headline     = $('#headline-modal-add').is(':checked');
    //     dataSynthesis.onOff        = $('#btn-onoff-hidden').val();
        
    //     $.post(
    //         {
    //             url: "test/ajaxupload.php",
    //             type: "POST",
    //             data:  "dataSynthesis",
    //             contentType: false,
    //             // cache: false,
    //             processData: false,
    
    //             success: function(data) {
    //                 console.log("SUCCESS 2 !!");
    //             },
    
    //             error: function(e) {
    //                 // $("#err").html(e).fadeIn();
    //                 console.log("Failed");
    //                 console.log(e);
    //             }   
    //         });
    // });

});