
$(function() {
    // $("#js-admin-add-nation-form").data('validator')
    //Changing Admin Password Using AJAX
   const add_validator = $("#js-admin-add-status-form").validate({
        rules: {
            title: {
                required: true,
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

            var form_data = new FormData($('#js-admin-add-status-form')[0]);
            $.ajax({
                type: "POST",
                url:  ADD_STATUS_URL,
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
                            window.location.href = ALL_STATUS_URL;
                        });
                    } else {
                        add_validator.showErrors(result.errors)
                    }

                },
                error: function(response) {
                    $('#titleErr').text(response.responseJSON.errors.title);
                }
            })

        }
    });

   const update_validator = $("#js-admin-edit-status-form").validate({
        rules: {
            title: {
                required: true,
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

            var form_data = new FormData($('#js-admin-edit-status-form')[0]);
            $.ajax({
                type: "POST",
                url:  UPDATE_STATUS_URL,
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
                            window.location.href = ALL_STATUS_URL;
                        });
                    } else {
                        update_validator.showErrors(result.errors)
                    }

                },
                error: function(response) {
                    $('#titleErr').text(response.responseJSON.errors.title);
                }
            })

        }
    });

    $(document).on('click', '.js-admin-delete-status', function(e) {

        var status_id = $(this).attr('data-id');

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
                url: SOFT_DELETE_STATUS_URL,
                type: 'POST',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: { status_id: status_id },
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
                            window.location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: result.message,
                            icon: "warning",
                            customClass: {
                                confirmButton: "btn btn-primary",
                            },
                            buttonsStyling: true,
                        }).then((result) => {
                            window.location.reload();
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
                        window.location.reload();
                    });
                }
            });


        }, function(dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your data is safe :)',
                    'error'
                )
            }

        })
    });

});

