@extends('layouts.layout')
@section('title', 'Edit student Marks')
@push('css')
<meta name="csrf-token" content="{{ csrf_token() }}">
@endpush
@section('content')

        <!--begin::Toolbar-->
<div class="toolbar" id="kt_toolbar">
    <!--begin::Container-->
    <div id="kt_toolbar_container" class="container-fluid d-flex flex-stack">
        <!--begin::Page title-->
        {{--<div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" class="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">--}}
        {{--<!--begin::Title-->--}}
        {{--<h1 class="d-flex align-items-center text-dark fw-bolder fs-3 my-1">List student--}}
        {{--<!--begin::Separator-->--}}
        {{--<span class="h-20px border-gray-200 border-start ms-3 mx-2"></span>--}}
        {{--<!--end::Separator-->--}}
        {{--<!--begin::Description-->--}}
        {{--                <small class="text-muted fs-7 fw-bold my-1 ms-1">Dashboard - Add Admin Users</small>--}}
        {{--<small class="text-muted fs-7 fw-bold my-1 ms-1"></small>--}}

        {{--<!--end::Description--></h1>--}}
        {{--<!--end::Title-->--}}
        {{--</div>--}}
        <!--end::Page title-->
    </div>
    <!--end::Container-->
</div>
<!--end::Toolbar-->


<!--begin::Post-->
<div class="post d-flex flex-column-fluid" id="kt_post">
    <!--begin::Container-->
    <div id="kt_content_container" class="container-fluid">
        <!--begin::Row-->
        <div class="row g-5 g-xl-8">
            <!--begin::Col-->
            <div class="col-xl-12">
                <!--begin::Container-->
                <div id="kt_content_container" class="container-fluid">
                    <!--begin::Basic info-->
                    <div class="card">
                        <!--begin::Card header-->
                        <div class="card-header border-0 bg-dark py-5" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                            <!--begin::Card title-->
                            <div class="card-title fw-bolder text-white">
                                Edit Student Marks
                            </div>
                            <!--end::Card title-->
                        </div>
                        <!--end::Card header-->
                        <div class="card-body">
                            <!--begin::Content-->
                            <div id="" class="collapse show">
                                <!--begin::Form-->
                                <form class="form-horizontal" id="studentmarkform" method="post"
                                      action="{{ route('update-student-marks') }}" name="studentform"
                                      data-url="{{ route('list-student-marks') }}">
                                    @csrf

                                    <div class="fv-row mb-10">
                                        <!--begin::Label-->
                                        <label class="fs-6 fw-bold mb-2">Student</label>
                                        <!--end::Label-->
                                        <select name="student" class="form-control" id="student">
                                            <option selected disabled>Choose Student</option>
                                            @foreach ($student as $key => $value)
                                                <option value="{{ $value->id }}" @if($value->id == $mark_details->student_id) selected="selected" @endif>{{ $value->student_name }}</option>
                                            @endforeach
                                        </select>
                                    </div>

                                    <div class="fv-row mb-10">
                                        <!--begin::Label-->
                                        <label class="fs-6 fw-bold mb-2">Term</label>
                                        <!--end::Label-->
                                        <select name="term" class="form-control" id="term">
                                            <option selected disabled>Choose Term</option>
                                            @foreach ($term as $key => $value)
                                                <option value="{{ $value->id }}" @if($value->id == $mark_details->term_id) selected="selected" @endif>{{ $value->term_name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    @foreach ($subject as $key => $value)
                                        <div class="row">
                                            <div class="form-group row">
                                                <label for="inputEmail3"
                                                       class="col-sm-1 col-form-label">{{ $value->subject_name }}</label>
                                                <div class="col-sm-6">
                                                    <input type="text" class="form-control" id="mark"
                                                           name="mark[{{ $value->id }}]"   placeholder="mark" value="{{$mark_details->subjectMark->where('subject_id', $value->id)->first()->mark}}" onkeypress="return NumberOnly(event)">
                                                    <p class="question" style="color: red"></p>
                                                </div>
                                            </div>
                                        </div>
                                @endforeach

                            </div>
                            <!--end::Content-->
                        </div>
                        <div class="card-footer">
                            <!--begin::Button-->
                            <button type="reset" id="kt_modal_add_subadmin_cancel" class="btn btn-light me-3">Cancel</button>
                            <!--end::Button-->
                            <!--begin::Button-->
                            <input type="hidden" name="hidden_term_id" value="{{$mark_details->id}}">
                            <button type="submit" id="kt_modal_add_subadmin_submit" class="btn btn-primary">
                                <span class="indicator-label">Submit</span>
                            <span class="indicator-progress">Please wait...
                                                <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                            </button>
                            <!--end::Button-->
                        </div>
                        </form>
                    </div>
                    <!--end::Basic info-->
                </div>
            </div>
        </div>
    </div>
</div>



@endsection

@push('js')
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js"></script>
<script>

    function NumberOnly(event) {

        var key = window.event ? event.keyCode : event.which;

        return ((key > 47 && key < 58))
    }

    let redirect = $('#studentmarkform').data("url");
    $("#studentmarkform").submit(function(e) {
                e.preventDefault();
                var form = $(this);
                var actionUrl = form.attr('action');
                $.ajax({
                    type: "POST",
                    url: actionUrl,
                    data: new FormData($(form)[0]),
                    dataType: 'JSON',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function(response) {
                        if (response.status == 200) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Do you want to continue',
                                icon: 'success',
                                confirmButtonText: 'ok'
                            })
                                    .then((result) => {
                                if (result.isConfirmed) {
                                location.href = redirect;
                            }
                        })
                    } else {
                        Swal.fire({
                                title: 'Error!',
                                text: 'Do you want to continue',
                                icon: 'error',
                                confirmButtonText: 'ok'
                            })
                }
            },
            error: function(resp) {
        console.log(resp);
        let errors = resp.responseJSON.errors;
        Object.keys(errors).forEach((item, index) => {
            $('input[name=' + item + ']')
                    .closest('div')
                    .append('<p class="error" style="color: red">' + errors[item][0] +
                    '</p>')
        })
    }
    });
    });
</script>

@endpush
