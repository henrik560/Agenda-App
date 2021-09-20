@extends('layouts/layout')
@push('styles')
    <link href="{{ asset("css/buildings.css") }}" rel="stylesheet" type="text/css" />
@endpush
@section('content')
    <div class="d-flex w-full h-full justify-content-center align-items-center">
        <div class="d-flex w-90 h-90 justify-content-center align-items-center" id="container-datatable">
            <div style="height: 400px; background-color: white;"></div>
        </div>
    </div>
@endsection 

