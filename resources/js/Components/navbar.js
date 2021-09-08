import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Burger extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid container-margin">
                <a className="navbar-brand fs-3" href="#">Pkn Rhenen</a>
                <button className="navbar-toggler mr-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse float-end" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-link ml-1 fs-6 active" aria-current="page" href="#">Agenda</a>
                    <a className="nav-link ml-1 fs-6" href="#">Gebouwen</a>
                    <a className="nav-link ml-1 fs-6" href="#">Gebruikers</a>
                    <a className="nav-link ml-1 fs-6" href="#">Exporteren</a>
                    <a className="nav-link ml-1 fs-6" href="#">Uitloggen</a>
                </div>
                </div>
            </div>
            </nav>
        )
    }
}

if(document.getElementById("navbar-wrapper")) {
    ReactDOM.render(<Burger />, document.getElementById("navbar-wrapper"));
}