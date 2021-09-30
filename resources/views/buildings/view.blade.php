@extends('layouts/layout')
    @push('styles')
        <link href="{{ asset("css/datatable.css") }}" rel="stylesheet" type="text/css" />
    @endpush
@section('content')
    <div id="view-building-wrapper" class="d-flex w-full h-full justify-content-center align-items-center">
    </div>
@endsection 
    @push('script')
        <script src={{ asset("js/datatables/buildings/buildings.js") }}></script>
    @endpush
