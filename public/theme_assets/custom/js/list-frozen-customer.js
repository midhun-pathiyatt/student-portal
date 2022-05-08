/* Customer details delete */

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
            window.location.reload();
        }
    });
});
