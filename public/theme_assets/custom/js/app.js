"use strict";

const body = document.getElementsByTagName("body")[0];

/*******************************************************
 *
 * Loader Start
 *
 *******************************************************/

const startLoader = function () {
    body.classList.add("page-loading");
};
const stopLoader = function () {
    body.classList.remove("page-loading");
};

/*******************************************************
 *
 * Loader End
 *
 *******************************************************/

/*******************************************************
 *
 * Button Loader Start
 *
 *******************************************************/

const startButtonLoader = function (btn, disable = true) {
    const button = $(btn);
    if (button.length) {
        if (disable) {
            button.prop("disabled", true);
        }
        button.prepend(
            '<span class="spinner-border spinner-border-sm align-middle me-2 js-button-loader"></span></span>'
        );
    }
};
const stopButtonLoader = function (btn, disable = true) {
    const button = $(btn);
    if (button.length) {
        if (disable) {
            button.prop("disabled", false);
        }
        const loader = button.find(".js-button-loader");
        if (loader.length) {
            loader.remove();
        }
    }
};

/*******************************************************
 *
 * Button Loader End
 *
 *******************************************************/

/*******************************************************
 *
 * Jquery Ajax Methods and options Start
 *
 *******************************************************/

const appendCsrfHeader = function (xhr) {
    xhr.setRequestHeader("X-CSRF-TOKEN", $("#csrfToken").attr("content"));
};

const appendAcceptJsonHeader = function (xhr, settings) {
    if (settings.acceptJson) {
        xhr.setRequestHeader("Accept", "application/json");
    }
};

const appendSpoofMethodHeader = function (xhr, settings) {
    if (settings.spoofMethod) {
        xhr.setRequestHeader("X-HTTP-METHOD-OVERRIDE", settings.spoofMethod);
    }
};

const prependBaseUrl = function (xhr, settings) {
    /** @link https://stackoverflow.com/a/19709846 */
    var r = new RegExp("^(?:[a-z]+:)?//", "i");
    // If url is not absolute url, then append baseurl
    if (!r.test(settings.url)) {
        settings.url =
            removeTrailingSlash(window.appConfig.adminBaseUrl) +
            addLeadingSlash(settings.url);
    }
};

const defaultAjaxBeforeSend = function (xhr, settings) {
    prependBaseUrl(xhr, settings);
    appendSpoofMethodHeader(xhr, settings);
    appendCsrfHeader(xhr, settings);
    appendAcceptJsonHeader(xhr, settings);
};

const getDefaultAjaxOptions = function () {
    return {
        acceptJson: true,
        beforeSend: defaultAjaxBeforeSend,
        error: defaultAjaxErrorHandler,
    };
};

const defaultAjaxErrorHandler = function (xhr, status, error) {
    const statusCode = xhr.status;
    const response = xhr.responseJSON;
    if (statusCode == 422) {
        renderValidationErrors(response, this.validator);
    }
};

const renderValidationErrors = function (response, validator = null) {
    if (validator && response.errors) {
        validator.showErrors(response.errors);
    }
};

/*******************************************************
 *
 * Jquery Ajax Methods and options End
 *
 *******************************************************/
/*******************************************************
 *
 * Miscellaneous Start
 *
 *******************************************************/

const removeTrailingSlash = function (string) {
    return string.replace(/\/+$/, "");
};

const removeLeadingSlash = function (string) {
    return string.replace(/^\/+/, "");
};

const addLeadingSlash = function (string) {
    if (string) {
        return "/" + removeLeadingSlash(string);
    }
    return string;
};

/*******************************************************
 *
 * Miscellaneous End
 *
 *******************************************************/

$(function () {
    $.validator.setDefaults({
        normalizer: function (value) {
            return $.trim(value);
        },
        ignore: [],
        // is-invalid is for elements with form-control class. text-danger is for the error message under the input
        errorClass: "validation-error is-invalid text-danger",
        errorPlacement: function (error, element) {
            if (element.data('select2')) {
                element.parent().append(error)
            } else if (element.hasClass('js-custom-file-input')) {
                error.appendTo(element.closest('.js-image-input-wrapper').find('.validation-error-wrapper'));
            } else {
                error.insertAfter(element);
            }
        },
        showErrors: function (errorMap, errorList) {
            this.defaultShowErrors();
        },
    });

    $(document).on("click", ".logout", function (event) {
        event.preventDefault();

        let currentOptions = {
            url: window.appConfig.logoutUrl,
            method: "POST",
            disableLoader: false,
        };

        const options = $.extend({}, getDefaultAjaxOptions(), currentOptions);
        $.ajax(options)
            .done(function (data, textStatus, jqXHR) {
                // execute on success
                window.location.href = window.appConfig.loginUrl;
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                // execute on error
                const handler = defaultAjaxErrorHandler.bind(this);
                handler(jqXHR, textStatus, errorThrown);
            })
            .always(function () {
                // always execute
            });
    });



});
