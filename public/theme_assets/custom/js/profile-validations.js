
$(function() {

    $.validator.addMethod('strongPassword', function(value, element) {
        return this.optional(element)
            || value.length >= 6
            && /\d/.test(value)
            && /[a-z]/i.test(value);
    }, 'Your password must be at least 6 characters long and contain at least one number and one char\'.')

    //Changing Admin Name Using AJAX
    $("#js-admin-name-change-form").validate({
        rules: {
            name: {
                required: true,
            },
        },
        messages: {
            name: {
                required: 'Please enter a name.',
            }
        },
        errorClass: "validation-error is-invalid text-danger",

        ignore: ' ',
        submitHandler: function(form) {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            var form_data = new FormData($('#js-admin-name-change-form')[0]);

            $.ajax({
                type: "POST",
                url:  NAME_EDIT_URL,
                dataType: 'JSON',
                data: form_data,
                cache: false,
                contentType: false,
                processData: false,
                success: function(result) {
                    if (result.status == 1) {
                        Swal.fire({
                            title: "Sucessfully Updated",
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
                            title: "Update Failed",
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
                error: function(response) {
                    $('#reg_error_msg').html(response.msg);
                    $(form).find('#js-admin-name-submit-btn').removeAttr('disabled');
                }
            })

        }
    });

    //Changing Admin Password Using AJAX
   const validator = $("#js-admin-password-change-form").validate({
        rules: {
            currentpassword: {
                required: true,
            },
            newpassword: {
                required: true,
                strongPassword: true
            },
            confirmpassword: {
                required: true,
                equalTo: '#newpassword'
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

            var form_data = new FormData($('#js-admin-password-change-form')[0]);
            $.ajax({
                type: "POST",
                url:  PASSWORD_EDIT_URL,
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
                            window.location.reload();
                        });
                    } else {
                        validator.showErrors(result.errors)
                    }

                },
                error: function(response) {
                    Swal.fire({
                        title: "Update Failed",
                        icon: "error",
                        customClass: {
                            confirmButton: "btn btn-primary",
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

