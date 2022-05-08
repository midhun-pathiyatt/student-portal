$(document).ready(function() {

    /* Add admin type with validation */
    $('#js-admin-add-admintype').validate({
        rules: {
            type: {
                required: true,
            },
            description: {
                required: true,
            },
            
        },
        errorClass: "is-invalid text-danger",

        ignore: ' ',
        submitHandler: function(form) {
            // $('#gull_loader').show();
            var form_data = new FormData($('#js-admin-add-admintype')[0]);

            $.ajax({
                type: "POST",
                url: ADMIN_TYPE_ADD_URL,
                dataType: 'JSON',
                data: form_data,
                cache: false,
                contentType: false,
                processData: false,
                success: function(result) {
                    if (result.status == 1) {
                        Swal.fire({
                            title: result.message,
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-success",
                            },
                            buttonsStyling: true,
                        }).then((result) => {
                            window.location.href = ADMIN_TYPE_LIST_URL;
                        });
                    } else {
                        validator.showErrors(result.errors);
                    }

                },
                error: function(response) {
                    $('#nameError').text(response.responseJSON.errors.type);
                    $('#emailError').text(response.responseJSON.errors.description);
                    $('#urlError').text(response.responseJSON.errors.url_permission);
                    $('#menuError').text(response.responseJSON.errors.menu_permission);
                }
            })

        }
    });

    /* Edit admin type with validation */
    $('#js-admin-edit-admintype').validate({
        rules: {
            type: {
                required: true,
            },
            description: {
                required: true,
            },

        },
        errorClass: "is-invalid text-danger",

        ignore: ' ',
        submitHandler: function(form) {
            var form_data = new FormData($('#js-admin-edit-admintype')[0]);

            $.ajax({
                type: "POST",
                url: ADMIN_TYPE_UPDATE_URL,
                dataType: 'JSON',
                data: form_data,
                cache: false,
                contentType: false,
                processData: false,
                success: function(result) {
                    
                    if (result.status == 1) {
                        Swal.fire({
                            title: result.message,
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-success",
                            },
                            buttonsStyling: true,
                        }).then((result) => {
                            window.location.href = ADMIN_TYPE_LIST_URL;
                        });
                    } else {
                        validator.showErrors(result.errors);
                    }

                },
                error: function(response) {
                    $('#typeError').text(response.responseJSON.errors.type);
                    $('#discError').text(response.responseJSON.errors.description);
                    $('#urlError').text(response.responseJSON.errors.url_permission);
                    $('#menuError').text(response.responseJSON.errors.menu_permission);
                }
            })

        }
    });


});