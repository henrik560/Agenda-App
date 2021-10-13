import React from 'react';
import ReactDom from 'react-dom'; 
import { Modal } from './components/modal'
import TableContentView from './components/view/table-content';
import TablePageSelector from './components/page-selector';
import { motion, framer } from "framer-motion";
import axios from 'axios';
import config from "../../tempConfg.json";


class ViewBuilding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            listAmount: 8,
            currentPage: 1,
            building: [],
            spaces: [],
            refresh: false,
            noResults: false,
            searchKeyWord: '',
        }
    }

    componentDidMount() {
        this.setModalState = this.setModalState.bind(this)
        this.fetchBuilding = this.fetchBuilding.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.fetchBuilding();
    }

    setModalState() {
        this.setState({openModal : this.state.openModal ? !this.state.openModal : true})
    }

    setListAmount = async (e) => {
        var newAmount = parseInt(e.target.innerHTML)
        this.setModalState()
        var spaces = this.splitInChunks(this.state.building.space, newAmount)
        this.setState({spaces, listAmount: newAmount, currentPage: this.state.currentPage <= spaces.length ? this.state.currentPage : spaces.length})
        if(this.state.searchKeyWord != '') this.filterListOnKeyWord(this.state.searchKeyWord)
    }

    fetchBuilding = async () => {
        this.setState({ refresh: true, spaces: [], building: [] })
        await axios.get(`${config.baseurl}/api/buildings/${this.props.buildingID}`).then(response => {
            var building = [];
            Object.values(response.data).flat().map((el, id) => building.push(el))
            this.setState({ building: building[0], spaces: this.splitInChunks(building[0].spaces, this.state.listAmount) })
        })
        this.setState({refresh: false})
    }

    setCurrentPage(newPage) {
        var newPage = parseInt(newPage)
        this.setState({currentPage: newPage})
    }

    filterListOnKeyWord(keyWord) {
        var spacesArray = this.splitInChunks(this.state.building.space.filter((word) => word.name.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())), this.state.listAmount)
        if(spacesArray.length == 0) {
            this.setState({noResults: true, spaces: spacesArray, searchKeyWord: keyWord})
        }else {
            this.setState({noResults: false, spaces: spacesArray, currentPage: this.state.currentPage <= spacesArray.length ? this.state.currentPage : spacesArray.length})
        }
    }

    splitInChunks(array, size) {
        var results = [];
        for (let index = 0; index < Math.max(array.length / size); index++) {
            results.push(array.slice(parseInt(index*size), parseInt(index*size + size)))
        }
        return results;
    };

    searchbar(keyWord) {
        if(this.state.refresh == true) return
        this.filterListOnKeyWord(keyWord.target.value.toLocaleLowerCase())
    }

    render() {
        if(this.state.building) {
            return (
                <div className="d-flex flex-column w-90 h-90" id="container-datatable">
                <div id="table-head" className="mt-3 w-full d-flex justify-content-between align-items-center">
                    <div className="ml-4 text-white d-flex flex-row justify-content-center align-items-center">
                        <a className="text-white text-decoration-none mr-2 d-flex justify-content-center align-items-center" href={`${config.baseurl}/buildings/overview`}>
                            <motion.i whileFocus={{ rotate: 360 }} whileHover={{ rotate: 360 }} className="fas fa-arrow-left mr-2 transition-150ms"></motion.i>
                        </a>
                        <span className="fs-5 d-flex gap-3"><b>Gebouw: </b>{this.state.building ? this.state.building.name : ''}</span>
                    </div>
                    <div id="table-buttons-container" className="d-flex justify-content-end align-items-end gap-3 pr-3">
                        <input placeholder="Zoeken" onChange={(e) => this.searchbar(e)} className="border-white-1 text-white" id="searchbbar-input"></input>
                        <div id="refresh-datatable" onClick={this.fetchBuilding} className={`d-flex transition-350ms justify-content-center align-items-center border-white-1 text-white ${this.state.refresh ? `rotate-360-linair` : ``}`}>
                            <i className="fas fa-sync-alt"></i>
                        </div>
                    </div>
                </div>
                <div id="table-content" className="mt-2">
                    <div id="table-data" className="d-flex flex-grow-1 flex-column">
                        <div id="table-content-head" className="d-flex flex-grow-1">
                            <div id="table-head-row" className="d-flex flex-grow-1 justify-content-around align-items-center">
                                <div id="head-row" className="head-row-name text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center gap-3">
                                    <span className="font-weight-bold">Naam</span>
                                </div>
                                <div id="head-row" className="head-row-hex text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center">
                                    <span className="font-weight-bold">Max Personen</span>
                                </div>
                                <div id="head-row" className="head-row-hex text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center">
                                    <span className="font-weight-bold">Prijs</span>
                                </div>
                                <div id="head-row" className="head-row-added text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center gap-3">
                                    <span className="font-weight-bold">Extern gebruik</span>
                                </div>
                                <div id="head-row" className="head-row-edited text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center">
                                    <span className="font-weight-bold">Acties</span>
                                </div>
                            </div>
                        </div>
                        <div id="table-body" className="d-flex flex-grow-1 flex-column">
                            <TableContentView loading={this.state.refresh} building={ this.state.spaces } searchError={this.state.noResults} listAmount={this.state.listAmount} currentPage={this.state.currentPage -1} />
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
                                <TablePageSelector buildings={ this.state.spaces } searchError={this.state.noResults} currentPage={this.state.currentPage} setCurrentPage={(e) => { this.setCurrentPage(e) }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }else {
            return "Er is iets fout gegaan"
        }
    }
}   

if(document.getElementById("view-building-wrapper")) {
    if(document.getElementById("buildingId")) {
        var buildingID = document.getElementById("buildingId").getAttribute("data-buildingid")
        if(!buildingID || isNaN(buildingID)) {
            document.getElementById("view-building-wrapper").innerHTML = "Er is iets fout gegaan!"
        }
        ReactDom.render(<ViewBuilding buildingID={buildingID}/>, document.getElementById("view-building-wrapper"))
    }
}

