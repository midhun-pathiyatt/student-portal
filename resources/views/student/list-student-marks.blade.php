@extends('layouts.layout')
@section('title', 'List Student Marks')
@section('content')

        <!--begin::Toolbar-->
<div class="toolbar" id="kt_toolbar">
    <!--begin::Container-->
    <div id="kt_toolbar_container" class="container-fluid d-flex flex-stack">
        <!--begin::Page title-->
        <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" class="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
            <!--begin::Title-->
            <h1 class="d-flex align-items-center text-dark fw-bolder fs-3 my-1">List Student Marks
                <!--begin::Separator-->
                <span class="h-20px border-gray-200 border-start ms-3 mx-2"></span>
                <!--end::Separator-->
                <!--begin::Description-->
                {{--                    <small class="text-muted fs-7 fw-bold my-1 ms-1">Dashboard - List Admin Type</small>--}}
                <small class="text-muted fs-7 fw-bold my-1 ms-1"></small>

                <!--end::Description--></h1>
            <!--end::Title-->
        </div>
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
        <div class="row gy-5 g-xl-8">

            <!--begin::Col-->
            <div class="col-xl-12">
                <!--begin::Container-->
                <div id="kt_content_container" class="container-fluid">
                    <!--begin::Card-->
                    <div class="card">
                        <!--begin::Card header-->
                        <div class="card-header border-0 pt-6">
                            <!--begin::Card title-->
                            <div class="card-title">
                            </div>
                            <!--begin::Card title-->
                            <!--begin::Card toolbar-->
                            <div class="card-toolbar">
                                <!--begin::Toolbar-->
                                <div class="d-flex justify-content-end" data-kt-customer-table-toolbar="base">

                                    <!--begin::Add customer-->
                                    <a href="{{route('add-student-marks')}}" type="button" class="btn btn-primary">Add Student Mark</a>
                                    <!--end::Add customer-->
                                </div>
                                <!--end::Toolbar-->
                            </div>
                            <!--end::Card toolbar-->
                        </div>
                        <!--end::Card header-->
                        <!--begin::Card body-->
                        <div class="card-body pt-0">
                            <!--begin::Table-->
                            <table class="table align-middle table-row-dashed fs-6 gy-5 data-table">
                                <!--begin::Table head-->
                                <thead>
                                <!--begin::Table row-->
                                <tr class="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                                    <th scope="col">Name</th>
                                    @foreach ($subject as $key => $value)
                                        <th scope="col">{{ $value->subject_name }}</th>
                                    @endforeach

                                    <th scope="col">term</th>
                                    <th scope="col">total marks</th>
                                    <th scope="col">created on</th>
                                    <th class="min-w-125px">Actions</th>
                                </tr>
                                <!--end::Table row-->
                                </thead>
                                <!--end::Table head-->
                                <!--begin::Table body-->
                                <tbody class="fw-bold text-gray-600">

                                @foreach ($student_term as $key => $value)
                                    <tr>
                                        <td>{{ $value->studentName->student_name }}</td>
                                        <td>{{ $value->subjectMark->where('subject_id', 1)->first()->mark }}</td>
                                        <td>{{ $value->subjectMark->where('subject_id', 2)->first()->mark }}</td>
                                        <td>{{ $value->subjectMark->where('subject_id', 3)->first()->mark }}</td>
                                        <td>{{ $value->term->term_name }}</td>
                                        <td>{{ $value->subject_mark_sum_mark }}</td>
                                        <td>{{ date("M d, Y H:i A", strtotime($value->created_at));  }}</td>
                                        <td>
                                            <a  href="{{ route('edit-student-marks',$value->id) }}" class="btn btn-primary btn-rounded m-1">
                                                <i class="bi bi-pencil-square"></i>
                                            </a>
                                            <a href="javascript:void(0)" data-id="{{$value->id}}" class="btn btn-danger btn-rounded m-1 delete_student_marks">
                                                <i class="bi bi-file-earmark-x"></i>
                                            </a>

                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                                <!--end::Table body-->
                            </table>
                            <!--end::Table-->
                        </div>
                        <!--end::Card body-->
                    </div>
                    <!--end::Card-->
                </div>
                <!--end::Container-->
            </div>
            <!--end::Col-->

        </div>
        <!--end::Row-->
    </div>
    <!--end::Container-->
</div>
<!--end::Post-->

@endsection
@push('js')
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js"></script>
<script>

    const STUDENT_DELETE_MARK_URL ="{{route('delete-student-marks')}}";

    $(document).on('click', '.delete_student_marks', function(e) {

        var term_id = $(this).attr('data-id');

        Swal.fire({
            title: 'Are you sure?',
            text: "Student mark details will be deleted!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0CC27E',
            cancelButtonColor: '#FF586B',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success mr-5',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed)
        {

            $.ajax({
                url: STUDENT_DELETE_MARK_URL,
                type: 'POST',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {term_id: term_id},
                success: function (data) {

                    if (data.status == 200) {
                        Swal.fire(
                                'Deleted!',
                                data.msg,
                                'success'
                        ),
                                setTimeout(function () {
                                    location.reload();
                                }, 3000);

                    } else {
                        Swal.fire(
                                'Not Deleted!',
                                data.msg,
                                'error'
                        );

                    }
                },
                error: function (msg) {

                }
            });


        }
        else
        {
            Swal.fire(
                    'Cancelled',
                    'Your details are safe :)',
                    'error'
            )


        }
    })

    });


</script>