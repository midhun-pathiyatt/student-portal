

function importBtn(){
    var x = document.getElementById("uploadExcel");
    if (x.style.display === "none") {
        x.style.display = "block";
        $('#importBtnName').text("Close");
    } else {
        x.style.display = "none";
        $('#importBtnName').html("Import");
    }
}

$(document).ready(function() {
    /* Customer Upload Validation */
    $('#js-admin-user-upload-form').validate({
        rules: {
            uploadExcel: {
                required: true,
                extension: "xlsx|xls|xlsm|csv"
            },
        },
        errorClass: "is-invalid text-danger",

        ignore: ' ',
        submitHandler: function(form) {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

                }
            });

            var form_data = new FormData($('#js-admin-user-upload-form')[0]);

            $('#upload_btn').text("Close");

            $.ajax({
                type: "POST",
                url:  CUSTOMER_UPLOAD_URL,
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
                            window.location.reload();
                        });
                    } else {
                        $('#uploadFile').text(result.message);
                    }

                },
                error: function(response) {
                    $('#uploadFile').text(response.responseJSON.message);
                }
            })

        }
    });

    /* Customer details validation */
     $('#admin-add-customers').validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true,
            },
            account_number: {
                required: true,
                minlength: 10
            },
            passport_number: {
                required: true,
                minlength: 10
            },
            nationality_id: {
                required: true,
            },
        },
        errorClass: "is-invalid text-danger",

        ignore: ' ',
        submitHandler: function(form) {

            $.ajaxSetup({
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

              }
            });

            var form_data = new FormData($('#admin-add-customers')[0]);

            $.ajax({
                type: "POST",
                url:  CUSTOMER_ADD_URL,
                dataType: 'JSON',
                data: form_data,
                cache: false,
                contentType: false,
                processData: false,
                success: function(result) {
                    console.log(result.data);
                    if (result.status == 1) {
                        Swal.fire({
                            title: result.message,
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-success",
                            },
                            buttonsStyling: true,
                        }).then((result) => {
                            window.location.href = CUSTOMER_LIST_URL;
                        });
                    } else {
                        validator.showErrors(result.errors);
                    }

                },
                error: function(response) {
                    $('#nameError').text(response.responseJSON.errors.name);
                    $('#emailError').text(response.responseJSON.errors.email);
                    // $('#mobileError').text(response.responseJSON.errors.mobile);
                    $('#account_numberError').text(response.responseJSON.errors.account_number);
                    $('#passport_numberError').text(response.responseJSON.errors.passport_number);
                }
            })

        }
    });






    /* Customer details edit  validation */
    $('#admin-edit-customers').validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true,
            },
            // mobile: {
            //     required: true,
            //     minlength: 10,
            //     maxlength:16,
            //     digits:true,
            // },
            account_number: {
                required: true,
                minlength: 10
            },
            passport_number: {
                required: true,
                minlength: 10
            },
            // currrency_type_id: {
            //     required: true,
            // },
            nationality_id: {
                required: true,
            },
        },
        errorClass: "is-invalid text-danger",

        ignore: ' ',
        submitHandler: function(form) {

            $.ajaxSetup({
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

              }
            });

            var form_data = new FormData($('#admin-edit-customers')[0]);

            $.ajax({
                type: "POST",
                url:  CUSTOMER_EDIT_URL,
                dataType: 'JSON',
                data: form_data,
                cache: false,
                contentType: false,
                processData: false,
                success: function(result) {
                    console.log(result);
                    if (result.status == 1) {
                        Swal.fire({
                            title: result.message,
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-success",
                            },
                            buttonsStyling: true,
                        }).then((result) => {
                            window.location.href = CUSTOMER_LIST_URL;
                        });
                    } else {
                        validator.showErrors(result.error);
                    }

                },
                error: function(response) {
                    console.log(response);
                    Swal.fire({
                        title: "Form Error",
                        icon: "Error",
                        customClass: {
                            confirmButton: "btn btn-danger",
                        },
                        buttonsStyling: true,
                    }).then((result) => {
                        window.location.reload();
                    });
                }
            })

        }
    });





});


    /* Customer details delete */

    $(document).on('click', '.delete-customer', function(e) {

        var customer_id = $(this).attr('data-id');
        console.log(customer_id);

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
                url: CUSTOMER_SOFT_DELETE_URL,
                type: 'POST',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: { customer_id: customer_id ,
                },
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
                            window.location.reload();
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
                    'Your file is safe :)',
                    'error'
                )
            }

        })
    });

    $(document).on('change', '.withdraw-button', function() {
            var withdraw_permission = $(this).prop('checked') == true ? 1 : 0;
            var user_id = $(this).data('id');
            $.ajax({
                type: "POST",
                dataType: "json",
                url: CUSTOMER_WITHDRAW_PERMISSION_URL,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {'withdraw_permission': withdraw_permission, 'user_id': user_id},
                success: function(result){
                  console.log(data.success)
                }
            });

      });

    $(document).on('change', '.transfer-button', function() {
        var transfer_permission = $(this).prop('checked') == true ? 1 : 0;
        var user_id = $(this).data('id');

        $.ajax({
            type: "POST",
            dataType: "json",
            url: CUSTOMER_TRANSFER_PERMISSION_URL,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {'transfer_permission': transfer_permission, 'user_id': user_id},
            success: function(result){
              console.log(data.success)
            }
        });
    });


    $(document).on('change', '.freezeaccount-button', function() {
        var freezeaccount = $(this).prop('checked') == true ? 1 : 0;
        var user_id = $(this).data('id');

        $.ajax({
            type: "POST",
            dataType: "json",
            url: CUSTOMER_ACCOUNT_FREEZE_URL,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {'freezeaccount': freezeaccount, 'user_id': user_id},
            success: function(result){
              console.log(data.success)
            }
        });
    });
