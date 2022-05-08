

$(function() {

    $.validator.addMethod('strongPassword', function(value, element) {
        return this.optional(element)
            || value.length >= 6
            && /\d/.test(value)
            && /[a-z]/i.test(value);
    }, 'Your password must be at least 6 characters long and contain at least one number and one char\'.')


    /* add subadmin details and validation */
     $('#js-admin-add-subadmin').validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
                minlength: 6,
            },
            mobile: {
                required: true,
                minlength: 10,
                maxlength:16,
                digits:true,
            },
            admin_type_id: {
                required: true,
            },
        },
        errorClass: "is-invalid text-danger",

        ignore: ' ',
        submitHandler: function(form) {

            $.ajaxSetup({

            });
        // alert('hi');
            var form_data = new FormData($('#js-admin-add-subadmin')[0]);

            $.ajax({
                type: "POST",
                url:  SUBADMIN_ADD_URL,
                dataType: 'JSON',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

                  },
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
                            window.location.href = SUBADMIN_LIST_URL;
                        });
                    } else {
                        validator.showErrors(result.errors);
                    }

                },
                error: function(response) {
                    $('#nameError').text(response.responseJSON.errors.name);
                    $('#emailError').text(response.responseJSON.errors.email);
                    $('#mobileError').text(response.responseJSON.errors.mobile);
                    $('#passwordError').text(response.responseJSON.errors.password);


                //     console.log(response.message);
                //     Swal.fire({
                //         title: "Form Error",
                //         icon: "Error",
                //         customClass: {
                //             confirmButton: "btn btn-danger",
                //         },
                //         buttonsStyling: true,
                //     }).then((result) => {
                //         window.location.reload();
                //     });
                }
            })

        }
    });

    /* subadmin details edit and validation */
    $('#js-admin-edit-subadmin').validate({

        rules: {
            name: {
                required: true,
                minlength: 3,
            },
            email: {
                required: true,
                email: true,
            },
            mobile: {
                required: true,
                minlength: 10,
                maxlength:16,
                digits:true,
            },
            admin_type_id: {
                required: true,
            },
            // currentpassword: {
            //     // required: true,
            // },
            // newpassword: {
            //     // required: true,
            //     strongPassword: true,
            // },
            // password_confirmation: {
            //     // required: true,
            //     equalTo: '#newpassword',
            // },
        },
        errorClass: "is-invalid text-danger",

        ignore: ' ',
        submitHandler: function(form) {

            $.ajaxSetup({
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

              }
            });
            var form_data = new FormData($('#js-admin-edit-subadmin')[0]);

            $.ajax({
                type: "POST",
                url:  SUBADMIN_EDIT_URL,
                dataType: 'JSON',
                data: form_data,
                cache: false,
                contentType: false,
                processData: false,
                success: function(result) {
                    console.log(result.message);
                    if (result.status == 1) {
                        Swal.fire({
                            title: result.message,
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-success",
                            },
                            buttonsStyling: true,
                        }).then((result) => {
                            window.location.href = SUBADMIN_LIST_URL;
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
                        // validator.showErrors(result.error);
                    }

                },
                error: function(response) {
                    $('#nameError').text(response.responseJSON.errors.name);
                    $('#emailError').text(response.responseJSON.errors.email);
                    $('#mobileError').text(response.responseJSON.errors.mobile);
                    $('#passwordError').text(response.responseJSON.errors.password);
                    // console.log(response);
                    // Swal.fire({
                    //     title: "Form Error",
                    //     icon: "Error",
                    //     customClass: {
                    //         confirmButton: "btn btn-danger",
                    //     },
                    //     buttonsStyling: true,
                    // }).then((result) => {
                    //     window.location.reload();
                    // });
                }
            })

        }
    });

});


    /* delete admins*/

    $(document).on('click', '.js-delete-subadmin', function(e) {
        console.log('hi');
        var subadmin_id = $(this).attr('data-id');
        // console.log(customer_id);

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
                url: ADMIN_SOFT_DELETE_URL,
                type: 'POST',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: { subadmin_id: subadmin_id ,
                },
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


    $(document).on('change', '#menucheck', function() {
        console.log('hi');
        $('#menuError').hide();
      });
