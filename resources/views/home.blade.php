@extends('Base_Layout/layout')
@push('styles')
    <link href="{{ asset('css/index.css') }}" rel="stylesheet">
@endpush

@section('content')
    <div id="calendar-wrapper"></div>
    @push('script')
    <script src="{{ asset('js/app.js') }}"></script>
@endpush
@endsection