@extends('layouts/layout')
@push('styles')
    <link href="{{ asset("css/buildings.css") }}" rel="stylesheet" type="text/css" />
@endpush
@section('content')
    <div id="content-wrapper" class="d-flex w-full h-full justify-content-center align-items-center">
        <div class="d-flex flex-column w-90 h-90" id="container-datatable">
            <div id="table-head" class="mt-3 w-full d-flex justify-content-end align-items-end">
                <div id="table-buttons-container" class="d-flex justify-content-end align-items-end gap-3 pr-3">
                    <input placeholder="Zoeken" class="border-white-1 text-white" id="searchbbar-input"></input>
                    <div id="refresh-datatable" class="d-flex justify-content-center align-items-center border-white-1 text-white"><i class="fas fa-sync-alt"></i></div>
                </div>
            </div>
            <div id="table-content" class="mt-2">
                <table id="table-data" class="d-flex flex-grow-1 flex-column">
                    <thead id="table-head" class="d-flex flex-grow-1">
                        <tr id="table-head-row" class="d-flex flex-grow-1 justify-content-around align-items-center">
                            <th id="head-row" class="head-row-id text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center">ID</th>
                            <th id="head-row" class="head-row-name text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center gap-3">
                                <span>Naam</span>
                                <div id="th-filter-icons" class="d-flex flex-column justify-content-center align-items-center">
                                    <i class="fas fa-sort-up mb-n2"></i>
                                    <i class="fas fa-sort-down mt-n2"></i>
                                </div>
                            </th>
                            <th id="head-row" class="head-row-hex text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center">Hex</th>
                            <th id="head-row" class="head-row-added text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center gap-3">
                                <span>Toegevoed op</span>
                                <div id="th-filter-icons" class="d-flex flex-column justify-content-center align-items-center">
                                    <i class="fas fa-sort-up mb-n2"></i>
                                    <i class="fas fa-sort-down mt-n2"></i>
                                </div>
                            </th>
                            <th id="head-row" class="head-row-edited text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center">
                                <span>Acties</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="table-body" class="d-flex flex-grow-1 flex-column">
                        <tr id="table-body-row" class="d-flex flex-grow-1 justify-content-around align-items-center">
                            <td id="body-row" class="body-row-id text-white d-flex justify-content-center align-items-center">1</td>
                            <td id="body-row" class="body-row-name text-white d-flex justify-content-center align-items-center">Admin</td>
                            <td id="body-row" class="body-row-hex text-white d-flex justify-content-center align-items-center">#343446</td>
                            <td id="body-row" class="body-row-added text-white d-flex justify-content-center align-items-center">23-04-2000</td>
                            <td id="body-row" class="body-row-edited text-white d-flex justify-content-center align-items-center">
                                <div>
                                    <i class="fas fa-edit"></i>
                                    <i class="far fa-trash-alt"></i>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfooter id="table-footer">
                        <div id="show-entries">resultaat 3 van de 343</div>
                        <div id="pages-icons"></div>
                    </tfooter>
                </table>
            </div>
        </div>
    </div>
@endsection 

<div backgroudn-color></div>