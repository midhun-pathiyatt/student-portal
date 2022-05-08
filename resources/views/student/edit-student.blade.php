@extends('layouts.layout')
@section('title', 'Edit student')
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
                                Edit Student
                            </div>
                            <!--end::Card title-->
                        </div>
                        <!--end::Card header-->
                        <div class="card-body">
                            <!--begin::Content-->
                            <div id="" class="collapse show">
                                <!--begin::Form-->
                                <form class="form-horizontal" id="studentform" method="post"
                                      action="{{ route('update-student') }}" name="studentform"
                                      data-url="{{ route('list-student') }}">
                                    @csrf
                                            <!--begin::Input group-->
                                    <!--end::Input group-->
                                    <!--begin::Input group-->
                                    <div class="fv-row mb-10">
                                        <!--begin::Label-->
                                        <label class="required fs-6 fw-bold mb-2">Name</label>
                                        <!--end::Label-->
                                        <!--begin::Input-->
                                        <input type="text" class="form-control form-control-solid" id="name" placeholder="" name="name" value="{{$student_details->student_name}}" />
                                        <span id="nameError" class="text-danger"></span>
                                        <!--end::Input-->
                                    </div>
                                    <!--end::Input group-->
                                    <!--begin::Input group-->
                                    <div class="fv-row mb-10">
                                        <!--begin::Label-->
                                        <label class="fs-6 fw-bold mb-2">
                                            <span class="required">Age</span>
                                        </label>
                                        <!--end::Label-->
                                        <!--begin::Input-->
                                        <input type="text" class="form-control form-control-solid" placeholder="" name="age" value="{{$student_details->age}}" onkeypress="return NumberOnly(event)"/>
                                        <span id="ageError" class="text-danger"></span>
                                        <!--end::Input-->
                                    </div>
                                    <!--end::Input group-->
                                    <!--begin::Input group-->
                                    <div class="fv-row mb-10">
                                        <!--begin::Label-->
                                        <label class="fs-6 fw-bold mb-2">Gender</label>
                                        <!--end::Label-->
                                        <select name="gender" class="form-control" id="gender">
                                            <option selected disabled>Choose Gender</option>
                                            @foreach ($gender as $key => $value)
                                                <option value="{{ $value->id }}" @if($value->id == $student_details->gender_id) selected="selected" @endif >{{ $value->gender_type }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <!--end::Input group-->
                                    <!--begin::Input group-->
                                    <div class="fv-row mb-10">
                                        <!--begin::Label-->
                                        <label class="fs-6 fw-bold mb-2">Reporting Teacher</label>
                                        <!--end::Label-->
                                        <select name="teacher" class="form-control" id="teacher">
                                            <option selected disabled>Choose Teacher </option>
                                            @foreach ($teacher as $key => $value)
                                                <option value="{{ $value->id }}" @if($value->id == $student_details->teacher_id) selected="selected" @endif>{{ $value->teacher_name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <!--end::Input group-->
                                    <!--end::Form-->

                            </div>
                            <!--end::Content-->
                        </div>
                        <div class="card-footer">
                            <!--begin::Button-->
                            <button type="reset" id="kt_modal_add_subadmin_cancel" class="btn btn-light me-3">Cancel</button>
                            <!--end::Button-->
                            <!--begin::Button-->
                            <input type="hidden" name="user_id" value="{{$student_details->id}}">
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

    let redirect = $('#studentform').data("url");
    $("#studentform").submit(function(e) {
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
    })
    })
</script>

@endpush
