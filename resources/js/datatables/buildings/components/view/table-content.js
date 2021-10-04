import React from 'react';
const config = require("../../../../tempConfg.json")

export default class TableContentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noSpaces: false
        }
    }

    componentDidMount() {

        //TODO onload do not display the "no spaces found message" 
        setTimeout(() => {
            this.setState({noSpaces: this.props.building.length == 0 ? true : false})
        }, 500);
    }

    render() {
        console.log(this.props)
        var buildingsElement
        if(this.props.searchError || this.props.building[this.props.currentPage]) {
            if(!this.props.searchError || this.props.building[this.props.currentPage] && this.props.building[this.props.currentPage].length > 0) {
                buildingsElement = this.props.building[this.props.currentPage].map((element, index) => {
                    return (
                        <div id="table-body-row" key={index} className="transition-250ms d-flex flex-grow-1 justify-content-around align-items-center">
                        <a id="hoverable-item" className="d-flex flex-grow-1" href={`middelen/`}>
                            <div id="body-row" className="body-row-name flex-grow-1 text-white d-flex justify-content-center align-items-center">
                                <span>{element.name}</span>
                            </div>
                        </a>
                        <div id="body-row" className="text-white d-flex justify-content-center align-items-center">{element.max_amount_of_persons} Pers.</div>
                        <div id="body-row" className="text-white d-flex justify-content-center align-items-center">&euro;{element.price_ex_vat}</div>
                        <div id="body-row" className="text-white d-flex justify-content-center align-items-center">{element.used_for_external_use == true ? `€${element.price_ex_vat}` : '-'}</div>
                        <div id="body-row" className="text-white d-flex justify-content-center align-items-center">
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
            if(this.state.noSpaces) return <div className="d-flex flex-grow-1 justify-content-center align-items-center text-white fs-2">Geen ruimtes gevonden!</div>
            return <div className="d-flex flex-grow-1 justify-content-center align-items-center transition-2s rotate-360-linair text-white fs-1"><i className="fas fa-spinner"></i></div>
        }
        return(buildingsElement)
    }
}