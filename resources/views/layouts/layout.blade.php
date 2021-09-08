<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="og:description" content="Hier kunt u uw ruimtes en middelen reserveren!" />
    <meta name="og:title" content="Pkn Rhenen - Agenda" />
    <meta name="og:url" content="{{url('/')}}" />
    <meta name="og:image" content="https://pknrhenen.nl/wp-content/themes/pknrhenen/external/images/logo.png" />
    <meta name="og:image:width" content="364" />
    <meta name="og:image:height" content="361" />
    <meta property="locale" content="nl_NL" />
    <meta property="og:site_name" content="Pkn Rhenen" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/7ea4a14f9b.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}" />
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    @stack('script')
    @stack('styles')
</head>
<body> 
    <div id="navbar-wrapper">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid container-margin">
                <a class="navbar-brand fs-3" href="#">Pkn Rhenen</a>
                <button class="navbar-toggler mr-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse float-end" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link ml-1 fs-6 active" aria-current="page" href="{{ route("agenda") }}">Agenda</a>
                    <a class="nav-link ml-1 fs-6" href="{{ route("buildings")}}">Gebouwen</a>
                    <a class="nav-link ml-1 fs-6" href="{{ route("users")}}">Gebruikers</a>
                    <a class="nav-link ml-1 fs-6" href="{{ route("export")}}">Exporteren</a>
                    <a class="nav-link ml-1 fs-6" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Uitloggen</a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                </div>
                </div>
            </div>
            </nav>
    </div>
    @yield('content')
</body>
    @stack('script')
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</html>