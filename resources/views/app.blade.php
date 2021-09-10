@extends('layouts/layout')
@push('styles')
    <link href="{{ asset('css/index.css') }}" rel="stylesheet">
@endpush

@section('content')
    @push('script')
    <script src="{{ asset('js/app.js') }}"></script>
@endpush
@endsection