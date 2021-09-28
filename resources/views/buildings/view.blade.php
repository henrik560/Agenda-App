@extends('layouts/layout')
    @push('styles')
    <link href="{{ asset("css/buildings.css") }}" rel="stylesheet" type="text/css" />
    @endpush
@section('content')
{{-- <section class="intro">
      <div class="mask d-flex align-items-center h-100" style="background-color: rgba(25, 185, 234,.25);">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Ruimte</th>
                          <th scope="col">Max personen</th>
                          <th scope="col">Dag prijs</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Product Revenue</th>
                          <th scope="col">Avg. Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Value</th>
                          <td>18,492</td>
                          <td>228</td>
                          <td>350</td>
                          <td>$4,787.64</td>
                          <td>$13.68</td>
                        </tr>
                        <tr>
                          <th scope="row">Percentage change</th>
                          <td>
                            <span class="text-danger">
                              <i class="fas fa-caret-down me-1"></i><span>-48.8%%</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>14.0%</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>46.4%</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>29.6%</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-danger">
                              <i class="fas fa-caret-down me-1"></i><span>-11.5%</span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Average</th>
                          <td>
                            <span class="text-danger">
                              <i class="fas fa-caret-down me-1"></i><span>-17,654</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>28</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>111</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>$1,092.72</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-danger">
                              <i class="fas fa-caret-down me-1"></i><span>$-1.78</span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Buy-to-details</th>
                          <td>
                            <span class="text-danger">
                              <i class="fas fa-caret-down me-1"></i><span>-48.8%%</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>14.0%</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>46.4%</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>29.6%</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-danger">
                              <i class="fas fa-caret-down me-1"></i><span>-11.5%</span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Sales</th>
                          <td>
                            <span class="text-danger">
                              <i class="fas fa-caret-down me-1"></i><span>-17,654</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>28</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>111</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>$1,092.72</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-danger">
                              <i class="fas fa-caret-down me-1"></i><span>$-1.78</span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Website traffic</th>
                          <td>
                            <span class="text-danger">
                              <i class="fas fa-caret-down me-1"></i><span>-48.8%%</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>14.0%</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>46.4%</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>29.6%</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-danger">
                              <i class="fas fa-caret-down me-1"></i><span>-11.5%</span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Clickthrough</th>
                          <td>
                            <span class="text-danger">
                              <i class="fas fa-caret-down me-1"></i><span>-17,654</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>28</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>111</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-success">
                              <i class="fas fa-caret-up me-1"></i><span>$1,092.72</span>
                            </span>
                          </td>
                          <td>
                            <span class="text-danger">
                              <i class="fas fa-caret-down me-1"></i><span>$-1.78</span>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </section> --}}
  {{$Building}}
@endsection 

