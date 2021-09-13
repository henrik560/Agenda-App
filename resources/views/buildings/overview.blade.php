@extends('layouts/layout')
@push('styles')
    <link src="{{asset('css/buildings.css')}}" type="text/css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.1/css/dataTables.bootstrap5.min.css"></script>
@endpush
@section('content')
<div class="datatable-wrapper" id="datatable-wrapper">
    <table id="datatable" class="table table-striped" widt="100%">
        <thead>
            <tr>
                <th>ID</th>
                <th>Naam</th>
                <th>Beheerder</th>
                <th>Beheerder Email</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($Buildings as $building)
                <tr>
                    <td>{{$building->id}}</td>
                    <td>{{$building->name}}</td>
                    <td>{{$building->user->name}}</td>
                    <td>{{$building->user->email}}</td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <th>ID</th>
                <th>Naam</th>
                <th>Beheerder</th>
                <th>Beheerder Email</th>
            </tr>
        </tfoot>
    </table>
</div>
@endsection

@push('script')
<script src="{{ asset("js/datatable.js") }}"></script>
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script src="https://cdn.datatables.net/1.11.1/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.11.1/js/dataTables.bootstrap5.min.js"></script>

@endpush
