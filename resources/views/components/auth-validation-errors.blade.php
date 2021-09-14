@props(['errors'])

@if ($errors->any())
    <div class="error-messages-wrapper" {{ $attributes }}>
        <div class="alert alert-danger d-flex align-items-center message-alert" role="alert">
            @foreach ($errors->all() as $error)
            <div>{{ $error }}</div>
            @endforeach
          </div>
    </div>
@endif
