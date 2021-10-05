@extends('layouts/layout')
    @push('styles')
        <link rel="stylesheet" type="text/css" href="{{ asset("css/agenda.css") }}">
    @endpush
@section('content')
{{-- <div id="agenda-wrapper"></div> --}}

<div class="agenda-container">
    <div class="agenda-child-container">
        <div class="header-container">
            <div class="sticky-header">
            </div>
        </div>
        <div class="content-container">
            <a>test</a>
            <a>test</a>
            <a>test</a>
            <a>test</a>
            <a>test</a>
            <a>test</a>
            <a>test</a>
            <a>test</a>
            <a>test</a>
            <a>test</a>
            <a>test</a>
        </div>
    </div>
</div>
@endsection
    @push('script')
        <script src={{ asset("js/datatables/agenda/agenda.js") }}></script>
    @endpush