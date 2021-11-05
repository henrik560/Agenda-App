import React from 'react';

export default class TableContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidUpdate() {
    }

    render() {
        var buildingsElement;
        if(this.props.users[this.props.currentPage] && !this.props.loading) {
            if(!this.props.searchError || this.props.users[this.props.currentPage].length > 0) {
                buildingsElement = this.props.users[this.props.currentPage].map((element, index) => {
                    return (
                        <div id="table-body-row" key={index} className="table-row-max-height users-overview-row transition-250ms d-flex flex-grow-1 justify-content-around align-items-center">
                        <div id="body-row" className="body-row-id text-white d-flex justify-content-center align-items-center">{element.id}</div>
                        <div id="body-row" className="body-row-name text-white d-flex justify-content-center flex-column align-items-center">
                            <span id="row-name">{element.name}</span>
                        </div>
                        <div id="body-row" className="body-row-hex text-white d-flex justify-content-center align-items-center">{element.role}</div>
                        <ul id="body-row" className="body-row-150 body-row-added text-white d-flex flex-column justify-content-center align-items-center">
                                {
                                    
                                    element.user_has_buildings.length > 0 ? element.user_has_buildings.map((element, index) => {
                                        if(element.building && element.building.name) {
                                            return (<li className="w-100" key={index}>{element.building.name}</li>)
                                        }
                                    }) : 'Geen'
                                }
                        </ul>
                        <div id="body-row" className="body-row-edited text-white d-flex justify-content-center align-items-center">
                            <div className="d-flex gap-3">
                                <a className="text-white" href={`edit/TODO/ACTIVATE POPUP/`}><i className="fas fa-edit"></i></a>
                                <a className="text-white" href={`delete/TODO/ACTIVATE POPUP/`}><i className="far fa-trash-alt"></i></a>
                            </div>
                        </div>
                    </div>)
                })
            }else {
                return (<div className="d-flex flex-grow-1 justify-content-center align-items-center text-white fs-1">Geen resultaten gevonden!</div>)
            }
        }else {
            if(this.props.loading) return <div className="d-flex flex-grow-1 justify-content-center align-items-center transition-2s rotate-360-linair text-white fs-1"><i className="fas fa-spinner"></i></div>
            return <div className="d-flex flex-grow-1 justify-content-center align-items-center text-white fs-2">Geen gebruikers gevonden!</div>
        }
        return(buildingsElement)
        // return(<div>Hai</div>)
    }
}