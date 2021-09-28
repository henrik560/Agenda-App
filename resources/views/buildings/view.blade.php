@extends('layouts/layout')
    
  @push('styles')
    <link href="{{ asset("css/buildings.css") }}" rel="stylesheet" type="text/css" />
  @endpush

@section('content')
    <div id="content-wrapper" class="d-flex w-full h-full justify-content-center align-items-center">
    </div>
@endsection 

  @push('script')
    <script src={{ asset("js/buildings.js") }}></script>
  @endpush
