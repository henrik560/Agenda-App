import React from 'react';
const config = require("../../../../tempConfg.json")

export default class TableContentOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        var buildingsElement
        if(this.props.searchError || this.props.buildings[this.props.currentPage] ) {
            if(!this.props.searchError || this.props.buildings[this.props.currentPage] && this.props.buildings[this.props.currentPage].length > 0) {
                buildingsElement = this.props.buildings[this.props.currentPage].map((element, index) => {
                    return (
                        <div id="table-body-row" key={index} className="transition-250ms d-flex flex-grow-1 justify-content-around align-items-center">
                        <div id="body-row" className="body-row-id text-white d-flex justify-content-center align-items-center">{element.id}</div>
                        <a id="hoverable-item" className="d-flex flex-grow-1" href={`view/${element.id}/`}>
                            <div id="body-row" className="body-row-name flex-grow-1 text-white d-flex justify-content-center align-items-center">
                                <span>{element.name}</span>
                            </div>
                        </a>
                        <div id="body-row" className="body-row-hex text-white d-flex justify-content-center align-items-center">{`#${element.color_hex}`}</div>
                        <div id="body-row" className="body-row-added text-white d-flex justify-content-center align-items-center">{element.created_at.split("T")[0]}</div>
                        <div id="body-row" className="body-row-edited text-white d-flex justify-content-center align-items-center">
                            <div className="d-flex gap-3">
                                <a className="text-white" href={`${config.baseurl}/buildings/editForm/${element.id}/`}><i className="fas fa-edit"></i></a>
                                <a className="text-white" href={`${config.baseurl}/buildings/deleteForm/${element.id}/`}><i className="far fa-trash-alt"></i></a>
                            </div>
                        </div>  
                    </div>)
                })
            }else {
                return (<div className="d-flex flex-grow-1 justify-content-center align-items-center text-white fs-2">Geen resultaten gevonden!</div>)
            }
        }else {
            return <div className="d-flex flex-grow-1 justify-content-center align-items-center transition-2s rotate-360-linair text-white fs-1"><i className="fas fa-spinner"></i></div>
        }
        return(buildingsElement)
    }
}