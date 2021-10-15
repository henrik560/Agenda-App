@extends('layouts/layout')
    @push('styles')
        <link rel="stylesheet" type="text/css" href="{{ asset("css/agenda.css") }}">
    @endpush
@section('content')
<div id="agenda-wrapper" class="agenda-container">
 
</div>
@endsection
    @push('script')
    <script src={{ asset("js/datatables/agenda/agenda.js") }}></script>
    @endpush