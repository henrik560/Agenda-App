import React from 'react';
import ReactDom from 'react-dom'; 
import { Modal } from './buildings/modal'
import { motion } from "framer-motion"
import TableContent from './buildings/table-content';
import TablePageSelector from './buildings/page-selector';
import axios from 'axios';
import update from 'react-addons-update';

class Buildings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            listAmount: 8,
            currentPage: 1,
            buildings: [],
            buildingsInChunks: [],
            refresh: false,
        }
    }

    componentDidMount() {
        this.setModalState = this.setModalState.bind(this)
        this.fetchBuildings = this.fetchBuildings.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.fetchBuildings();
    }

    setModalState() {
        this.setState({openModal : this.state.openModal ? !this.state.openModal : true})
    }

    setListAmount(e) {
        var newAmount = parseInt(e.target.innerHTML)
        this.setModalState()
        this.setState({buildingsInChunks: this.splitInChunks(this.state.buildings, newAmount), listAmount: newAmount, currentPage: 1})
    }

    fetchBuildings = async () => {
        this.setState({ refresh: true })
        await axios.get('http://127.0.0.1:8000/api/buildings/get').then(response => {
            var buildings = [];
            Object.values(response.data).flat().map((el, id) => buildings.push(el))
            this.setState({ buildingsInChunks: this.splitInChunks(buildings, this.state.listAmount), buildings, currentPage: 1, listAmount: 8 })
        })
        this.setState({refresh: false})
    }

    splitInChunks(array, size) {
        var results = [];
        for (let index = 0; index < Math.max(array.length / size); index++) {
            results.push(array.slice(parseInt(index*size), parseInt(index*size + size)))
        }
        return results;
    };

    setCurrentPage(newPage){
        var newPage = parseInt(newPage)
        this.setState({currentPage: newPage})
    }

    searchbar(e) {
        var buildingsArray = this.state.buildings.filter((word) => word.name.startsWith(e.target.value)) || []
        this.setState({buildingsInChunks: this.splitInChunks(buildingsArray, this.state.listAmount)})
        // console.log(this.state.buildingsInChunks)
        console.log(this.splitInChunks(buildingsArray, this.state.listAmount))
        setTimeout(() => {
            this.state.buildingsInChunks
        }, 1000);
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
                            <div id="head-row" className="head-row-id text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center">ID</div>
                            <div id="head-row" className="head-row-name text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center gap-3">
                                <span>Naam</span>
                                <div id="div-filter-icons" className="d-flex flex-column justify-content-center align-items-center">
                                    <i className="fas fa-sort-up mb-n2"></i>
                                    <i className="fas fa-sort-down mt-n2"></i>
                                </div>
                            </div>
                            <div id="head-row" className="head-row-hex text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center">Hex</div>
                            <div id="head-row" className="head-row-added text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center gap-3">
                                <span>Toegevoed op</span>
                                <div id="div-filter-icons" className="d-flex flex-column justify-content-center align-items-center">
                                    <i className="fas fa-sort-up mb-n2"></i>
                                    <i className="fas fa-sort-down mt-n2"></i>
                                </div>
                            </div>
                            <div id="head-row" className="head-row-edited text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center">
                                <span>Acties</span>
                            </div>
                        </div>
                    </div>
                    <div id="table-body" className="d-flex flex-grow-1 flex-column">
                        <TableContent buildings={this.state.buildingsInChunks[this.state.currentPage -1]} listAmount={this.state.listAmount} currentPage={this.state.currentPage}/>
                    </div>
                    <div id="table-footer" className="mt-3 ml-2 mb-3 d-flex flex-row justify-content-between">
                            <Modal openModal={this.state.openModal} setListAmount={(e) => {this.setListAmount(e)}} />
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
                            <TablePageSelector buildings={this.state.buildingsInChunks} currentPage={this.state.currentPage} setCurrentPage={(e) => { this.setCurrentPage(e) }} />
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

