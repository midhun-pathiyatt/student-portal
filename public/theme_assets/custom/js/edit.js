"use strict";

$(function () {
    const form = $("#js_banner_edit_form");
    const bannerImage = $("#js_banner_image");
    const bannerType = $("#js_banner_type");
    const bannerClickUrl = $("#js_banner_on_click_url");
    const bannerPosition = $("#js_banner_position");
    const submitBtn = $("#js_banner_edit_save");

    const rules = {
        banner_image: {},
        banner_type: {
            required: true,
        },
        banner_on_click_url: {
            required: false,
            url: true,
        },
        banner_position: {
            required: true,
        },
        // It is added so that showErrors() method would show error labels under otherwise may throw error
        error: {
            required: false,
        },
    };

    const validator = form.validate({
        rules: rules,
        messages: {},
        submitHandler: function (formElement, event) {
            event.preventDefault();

            let formData = new FormData();
            const file = bannerImage[0].files.length
                ? bannerImage[0].files[0]
                : null;

            formData.append("banner_image", file || "");
            formData.append("banner_type", bannerType.val()
                || "");
            formData.append("banner_on_click_url", bannerClickUrl.val() || "");
            formData.append("banner_position", bannerPosition.val() || "");
            let url = form.data("action");

            let currentOptions = {
                url: url,
                data: formData,
                method: "POST",
                spoofMethod: "PATCH",
                validator: validator,
                beforeSend: function (xhr, settings) {
                    startButtonLoader(submitBtn);
                    defaultAjaxBeforeSend(xhr, settings);
                },

                // contentType:false and processData:false are needed when sending formData
                contentType: false,
                processData: false,
                disableLoader: false,
            };

            const options = $.extend(
                {},
                getDefaultAjaxOptions(),
                currentOptions
            );
            $.ajax(options)
                .done(function (data, textStatus, jqXHR) {
                    Swal.fire({
                        title: "Banner updated successfully",
                        icon: "success",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        },
                        buttonsStyling: true,
                    }).then((result) => {
                        window.location.reload();
                    });
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    // execute on error
                    const handler = defaultAjaxErrorHandler.bind(this);
                    handler(jqXHR, textStatus, errorThrown);
                })
                .always(function () {
                    // always execute
                    stopButtonLoader(submitBtn);
                });
        },
    });
});

