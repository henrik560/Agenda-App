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

    {{-- Google Fonts Connect --}}
    <link rel="preconnect" href="https://fonts.gstatic.com">
    {{-- Jquery 3.5.1 --}}
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    {{-- Font Awesome --}}
    <script src="https://kit.fontawesome.com/7ea4a14f9b.js" crossorigin="anonymous"></script>
    {{-- Google Fonts --}}
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&display=swap" rel="stylesheet">
    {{-- Bootstrap 5 --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    {{-- Custom styles and scripts --}}
    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}" />
    <script src="{{ asset('js/navbar.js') }}"></script>
    @stack('styles')
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body> 
        <nav class="navbar navbar-expand-custom navbar-mainbg" id="main-nav">
        <a class="navbar-brand navbar-logo" href="{{ url("/")}}">Pkn - Rhenen</a>
        <button class="navbar-toggler" id="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars text-white"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <div class="hori-selector"><div class="left"></div><div class="right"></div></div>
                <li class="nav-item">
                    <a class="nav-link" href="{{ url("agenda")}}"><i class="fas fa-calendar-week"></i>Agenda</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ url("buildings/overview")}}"><i class="far fa-building"></i>Gebouwen</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ url("users/overview")}}"><i class="fas fa-users"></i>Gebruikers</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ url("export")}}"><i class="fas fa-file-excel"></i>Exporteren</a>
                </li>
                @auth
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();"><i class="fas fa-sign-out-alt"></i>Uitloggen</a>
                    </li>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                @endauth
                @guest
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('login') }}"><i class="fas fa-sign-in-alt"></i>Inloggen</a>
                    </li>
                @endguest
        
            </ul>
        </div>
    </nav>
    @yield('content')
</body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    @stack('script')
    </html>