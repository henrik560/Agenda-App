import React from 'react';
import config from "../../../../tempConfg.json"

export default class TableContentOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleEditClick(box, Data) {
        this.props.setModalData(box, Data)
        this.props.openModal(box, true)
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
                                <span className="text-center w-full text-truncate">{element.name}</span>
                            </div>
                        </a>
                        <div id="body-row" className="body-row-hex text-white d-flex justify-content-center align-items-center text-center w-full text-truncate">{`#${element.color_hex}`}</div>
                        <div id="body-row" className="body-row-added text-white d-flex justify-content-center align-items-center text-center w-full text-truncate">{element.created_at.split("T")[0]}</div>
                        <div id="body-row" className="body-row-edited text-white d-flex justify-content-center align-items-center text-center w-full text-truncate">
                            <div className="d-flex gap-3">
                                <a className="text-white" onClick={() => { this.handleEditClick('edit',{name: element.name, hex: element.color_hex})}}><i className="fas fa-edit"></i></a>
                                <a className="text-white" onClick={() => { this.handleEditClick('delete', {name: element.name, id: element.id})}}><i className="far fa-trash-alt"></i></a>
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