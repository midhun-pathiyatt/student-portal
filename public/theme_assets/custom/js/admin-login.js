

$(document).ready(function() {

var url = $('#siteurl').val();
/*Login validation and auth*/
$('#admin-login').validate({
    rules: {
        email: {
            required: true,
            email: true,
        },
        password: {
            required: true,
            minlength: 6
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

        var form_data = new FormData($('#admin-login')[0]);
        $(".alert-box .type").html('Processing...');
        $(".alert-box .alert").removeClass('d-none alert-danger');
        $(".alert-box .alert").addClass('alert-primary').removeClass('d-none');

        $.ajax({
            type: "POST",
            url:  url + "/system-admin/sign-in",
            dataType: 'JSON',
            data: form_data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
                if (result.status == 1) {
                    window.location.href = url + "/system-admin/dashboard";
                } else {
                    if (result.message) {
                        if (result.error) {
                            //swal('Oops!',result.message,'error');
                            $(".alert-box .type").html(result.message);
                            $(".alert-box .alert").addClass('alert-danger').removeClass('d-none');

                        } else {
                            $.each(result.message, function(key, value) {
                                if (value[0])
                                    $("#admin-login .error_" + key).html(value[0]);
                            });
                        }
                    }
                }

            },
            error: function(response) {
                $('#reg_error_msg').html(response.msg);
                $(form).find('#reg_submit').removeAttr('disabled');
            }
        })

    }
});



});
