@extends('layouts/layout')
    @push('styles')
        <link href="{{ asset("css/datatable.css") }}" rel="stylesheet" type="text/css" />
    @endpush
@section('content')
    <div id="content-wrapper" class="d-flex w-full h-full justify-content-center align-items-center">
    </div>
    <input type="hidden" name="csrf_token" id="csrf_token" value="{{ csrf_token() }}"></input>
@endsection 
    @push('script')
        <script src={{ asset("js/datatables/buildings/buildingsOverview.js") }}></script>
    @endpush
