
$(function() {
    // $("#js-admin-add-nation-form").data('validator')
    //Changing Admin Password Using AJAX
   const add_validator = $("#js-admin-add-nation-form").validate({
        rules: {
            name: {
                required: true,
            },
            country_code: {
                required: true,
            },
            phone_code: {
                required: true,
                digits: true,
            },
        },
        errorClass: "validation-error is-invalid text-danger",

        ignore: ' ',
        submitHandler: function(form) {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            var form_data = new FormData($('#js-admin-add-nation-form')[0]);
            $.ajax({
                type: "POST",
                url:  ADD_NATION_URL,
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
                                confirmButton: "btn btn-primary",
                            },
                            buttonsStyling: true,
                        }).then((result) => {
                            window.location.href = ALL_NATION_URL;
                        });
                    } else {
                        add_validator.showErrors(result.errors)
                    }

                },
                error: function(response) {
                    $('#nameErr').text(response.responseJSON.errors.name);
                    $('#countryCodeErr').text(response.responseJSON.errors.country_code);
                    $('#phoneCodeErr').text(response.responseJSON.errors.phone_code);
                }
            })

        }
    });

   const update_validator = $("#js-admin-edit-nation-form").validate({
        rules: {
            name: {
                required: true,
            },
            country_code: {
                required: true,
            },
            phone_code: {
                required: true,
                digits: true,
            },
        },
        errorClass: "validation-error is-invalid text-danger",

        ignore: ' ',
        submitHandler: function(form) {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            var form_data = new FormData($('#js-admin-edit-nation-form')[0]);
            $.ajax({
                type: "POST",
                url:  UPDATE_NATION_URL,
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
                                confirmButton: "btn btn-primary",
                            },
                            buttonsStyling: true,
                        }).then((result) => {
                            window.location.href = ALL_NATION_URL;
                        });
                    } else {
                        update_validator.showErrors(result.errors)
                    }

                },
                error: function(response) {
                    $('#nameErr').text(response.responseJSON.errors.name);
                    $('#countryCodeErr').text(response.responseJSON.errors.country_code);
                    $('#phoneCodeErr').text(response.responseJSON.errors.phone_code);
                }
            })

        }
    });

    $(document).on('click', '.js-admin-delete-nation', function(e) {

        var nation_id = $(this).attr('data-id');

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0CC27E',
            cancelButtonColor: '#FF586B',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success mr-5',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function() {
            $.ajax({
                url: SOFT_DELETE_NATION_URL,
                type: 'POST',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: { nation_id: nation_id },
                success: function(result) {
                    if (result.status == 1) {
                        Swal.fire({
                            title: result.message,
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary",
                            },
                            buttonsStyling: true,
                        }).then((result) => {
                            window.location.href = ALL_NATION_URL;
                        });
                    } else {
                        Swal.fire({
                            title: result.message,
                            icon: "error",
                            customClass: {
                                confirmButton: "btn btn-primary",
                            },
                            buttonsStyling: true,
                        }).then((result) => {
                            window.location.href = ALL_NATION_URL;
                        });
                    }
                },
                error: function(msg) {
                    Swal.fire({
                        title: "Something Went Wrong",
                        icon: "error",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        },
                        buttonsStyling: true,
                    }).then((result) => {
                        window.location.href = ALL_NATION_URL;
                    });
                }
            });


        }, function(dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your file is safe :)',
                    'error'
                )
            }

        })
    });

});

