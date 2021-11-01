@extends('layouts/layout')
    @push('styles')
        <link rel="stylesheet" type="text/css" href="{{ asset("css/agenda.css") }}">
    @endpush
@section('content')
<div id="agenda-wrapper" class="agenda-container">
    
</div>
<input type="hidden" name="userID" id="userID" value="{{ auth()->user()->id }}"></input>
<input type="hidden" name="csrf_Token" id="csrf_Token" value="{{ csrf_token() }}"></input>
@endsection
    @push('script')
    <script src={{ asset("js/datatables/agenda/agenda.js") }}></script>
    @endpush