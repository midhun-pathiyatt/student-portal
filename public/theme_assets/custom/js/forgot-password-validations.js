$(function() {
$.validator.addMethod('strongPassword', function(value, element) {
    return this.optional(element)
        || value.length >= 6
        && /\d/.test(value)
        && /[a-z]/i.test(value);
}, 'Your password must be at least 6 characters long and contain at least one number and one char\'.')

const email_validator = $("#js-admin-email-validate-form").validate({
    rules: {
        email: {
            required: true,
            email: true
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

        var form_data = new FormData($('#js-admin-email-validate-form')[0]);
        $('#kt_password_reset_submit').attr('disabled', true);
        document.getElementById('kt_password_reset_submit').setAttribute("data-kt-indicator", "on");

        $.ajax({
            type: "POST",
            url:  EMAIL_VALIDATION_URL,
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
            error: function(response) {
                $('#emailErr').text(response.responseJSON.errors.email);
            }
        })

    }
});


const password_validator = $("#js-admin-password-change-form").validate({
    rules: {
        password: {
            required: true,
            strongPassword: true
        },
        confirm_password: {
            required: true,
            equalTo: '#password'
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
            url:  PASSWORD_CHANGE_URL,
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
                        window.location.href = LOGIN_URL;
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
            error: function(response) {
                $('#passwordErr').text(response.responseJSON.errors.password);
            }
        })

    }
});

});
