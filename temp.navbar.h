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