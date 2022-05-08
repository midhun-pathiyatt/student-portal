$(function(){

    $(document).ready(function(){
        $(document).on('change','#status_sel',function(){
            var status_value = $(this).val();
            if(status_value == 2){
                $("#txn_id_div").show();
            }else {
                $("#txn_id_div").hide();
            }
        });
    });

    $(document).on('click','.action_btn',function (event){
        const id = $(this).data('id');
        const uid = $(this).data('usr');
        $('#row_id').val(id);
        $('#row_uid').val(uid);
    });




    const add_txn_id = $("#js-admin-update-withdraw-form").validate({
        rules: {
            status_sel: {
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

            var form_data = new FormData($('#js-admin-update-withdraw-form')[0]);
            $('#kt_modal_txn_submit').attr('disabled', true);
            document.getElementById('kt_modal_txn_submit').setAttribute("data-kt-indicator", "on");

            $.ajax({
                type: "POST",
                url:  WITHDRAW_ACTION_URL,
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
                        add_txn_id.showErrors(result.errors)
                    }

                },
                error: function(response) {
                    $('#txnIdErr').text(response.responseJSON.errors.name);
                }
            })

        }
    });
})


function multiReqActionBtn(element) {
    var status_id = $(element).closest('.row').find('.js-multi-select-cls').val();
    if (status_id == 0) {
        // $('#bulkStatusErr').text("Select a status");
        Swal.fire({
            title: "Select a status",
            icon: "warning",
            customClass: {
                confirmButton: "btn btn-primary",
            },
            buttonsStyling: true,
        })
    } else {
        var val = [];
        $('.js-request-list-class:checked').each(function (i) {
            val[i] = $(this).val();
        });
        if (val.length <= 0) {
            // $('#bulkStatusErr').text("Select any row");
            Swal.fire({
                title: "Select any row",
                icon: "warning",
                customClass: {
                    confirmButton: "btn btn-primary",
                },
                buttonsStyling: true,
            })
        } else {

            $.ajax({
                url: WITHDRAW_BULK_ACTION_URL,
                type: 'POST',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {status_id: status_id, req_row_id: val},
                success: function (result) {
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
                error: function (msg) {
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
        }
    }

}


//
// function reqListSelect(element) {
//     $('#request_list').change(function() {
//         if(this.checked) {
//             $("#js-toggle-div").show();
//         }
//         else {
//             $("#js-toggle-div").hide();
//         }
//     });
// }


