@if ($Buildings)
    @foreach ($Buildings as $building)
        <pre>{{$building}}</pre>
    @endforeach
@endif