import React from 'react';
import ReactDom from 'react-dom'; 
import { Modal } from '../modal'
import TableContent from '../table-content';
import TablePageSelector from '../page-selector';
import axios from 'axios';
import Building from '../../buildings';
const config = require("../../tempConfg.json")


class BuildingOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            listAmount: 8,
            currentPage: 1,
            buildings: [],
            buildingsInChunks: [],
            refresh: false,
            noResults: false,
        }
    }

    componentDidMount() {
        this.fetchBuildings();
    }

    fetchBuildings = async () => {
        this.setState({ refresh: true, buildingsInChunks: [] })
        await axios.get(`${config.baseurl}/api/buildings/`).then(response => {
            var buildings = [];
            Object.values(response.data).flat().map((el, id) => buildings.push(el))
            this.setState({ buildingsInChunks: this.splitInChunks(buildings, this.state.listAmount), buildings })
        })
        this.setState({refresh: false})
    }

    render() {
        return (
            <div className="d-flex flex-column w-90 h-90" id="container-datatable">
            <div id="table-head" className="mt-3 w-full d-flex justify-content-end align-items-end">
                <div id="table-buttons-container" className="d-flex justify-content-end align-items-end gap-3 pr-3">
                    <input placeholder="Zoeken" onChange={(e) => this.searchbar(e)} className="border-white-1 text-white" id="searchbbar-input"></input>
                    <div id="refresh-datatable" onClick={this.fetchBuildings} className={`d-flex transition-350ms justify-content-center align-items-center border-white-1 text-white ${this.state.refresh ? `rotate-360-linair` : ``}`}>
                        <i className="fas fa-sync-alt"></i>
                    </div>
                </div>
            </div>
            <div id="table-content" className="mt-2">
                <div id="table-data" className="d-flex flex-grow-1 flex-column">
                    <div id="table-content-head" className="d-flex flex-grow-1">
                        <div id="table-head-row" className="d-flex flex-grow-1 justify-content-around align-items-center">
                            <div id="head-row" className="head-row-id text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center gap-3">
                                <span className="font-weight-bold">ID</span>
                            </div>
                            <div id="head-row" className="head-row-name text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center gap-3">
                                <span className="font-weight-bold">Naam</span>
                            </div>
                            <div id="head-row" className="head-row-hex text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center">
                                <span className="font-weight-bold">Hex</span>
                            </div>
                            <div id="head-row" className="head-row-added text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center gap-3">
                                <span className="font-weight-bold">Toegevoed op</span>
                            </div>
                            <div id="head-row" className="head-row-edited text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center">
                                <span className="font-weight-bold">Acties</span>
                            </div>
                        </div>
                    </div>
                    <div id="table-body" className="d-flex flex-grow-1 flex-column">
                        <TableContent buildings={ this.state.buildingsInChunks } searchError={this.state.noResults} listAmount={this.state.listAmount} currentPage={this.state.currentPage -1} />
                    </div>
                    <div id="table-footer" className="mt-3 ml-2 mb-3 d-flex flex-row justify-content-between">
                            <Modal openModal={this.state.openModal} current={this.state.listAmount} setListAmount={(e) => {this.setListAmount(e)}} />
                        <div id="rows-visible" className="d-flex flex-row">
                            <div id="rows-visible-container" className="d-flex flex-row gap-2 justify-content-center align-items-center text-white">
                                <div id="toggle-rows-button" className="border-white-1 gap-1" onClick={this.setModalState}>
                                    <span className="text-white" id="number">{this.state.listAmount}</span>
                                    <i className={`fas fa-sort-down text-white mt-n1 transition-250ms ${this.state.openModal ? 'rotate-180deg mt-1' : '' }`}></i>
                                </div>
                                <div>Aantal per pagina</div>
                            </div>
                        </div>
                        <div id="pages-icons" className="d-flex">
                            <TablePageSelector buildings={ this.state.buildingsInChunks } searchError={this.state.noResults} currentPage={this.state.currentPage} setCurrentPage={(e) => { this.setCurrentPage(e) }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

if(document.getElementById("content-wrapper")) {
    ReactDom.render(<Buildings/>, document.getElementById("content-wrapper"))
}
