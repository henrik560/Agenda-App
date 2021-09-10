@extends('layouts/layout')
@push('styles')
    <link src="{{asset('css/buildings.css')}}" type="text/css" rel="stylesheet"/>
@endpush
@section('content')
<div class="container">
  <div class="row">
      <div class="col-md-offset-1 col-md-10">
          <div class="panel">
              <div class="panel-heading">
                  <div class="row">
                      <div class="col col-sm-3 col-xs-12">
                          <h4 class="title">Data <span>List</span></h4>
                      </div>
                      <div class="col-sm-9 col-xs-12 text-right">
                          <div class="btn_group">
                              <input type="text" class="form-control" placeholder="Search">
                              <button class="btn btn-default" title="Reload"><i class="fa fa-sync-alt"></i></button>
                              <button class="btn btn-default" title="Pdf"><i class="fa fa-file-pdf"></i></button>
                              <button class="btn btn-default" title="Excel"><i class="fas fa-file-excel"></i></button>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="panel-body table-responsive">
                  <table class="table">
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Gebouw Naam</th>
                              <th>Beheerder Naam</th>
                              <th>Beheerder Email</th>
                              <th>Acties</th>
                          </tr>
                      </thead>
                      <tbody>
                        @if ($Buildings)
                        @foreach ($Buildings as $building)
                        <tr>
                          <td>{{$building->id}}</td>
                          <td>{{$building->name}}</td>
                          <td>{{$building->user->name}}</td>
                          <td>{{$building->user->email}}</td>
                          <td>
                              <ul class="action-list">
                                  <li><a href="#" data-tip="edit"><i class="fa fa-edit"></i></a></li>
                                  <li><a href="#" data-tip="delete"><i class="fa fa-trash"></i></a></li>
                              </ul>
                          </td>
                        </tr>
                        @endforeach
                      @else
                          <tr>Er zijn geen gebouwen om af te beelden</tr>
                      @endif
                      </tbody>
                  </table>
              </div>
              <div class="panel-footer">
                <div class="row">
                    <div class="col col-sm-6 col-xs-6">showing <b>5</b> out of <b>25</b> entries</div>
                    <div class="col-sm-6 col-xs-6">
                        <ul class="pagination hidden-xs pull-right">
                            <li><a href="#"><</a></li>
                            <li class="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li><a href="#">></a></li>
                        </ul>
                        <ul class="pagination visible-xs pull-right">
                            <li><a href="#"><</a></li>
                            <li><a href="#">></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
@endsection
