import React from 'react';
import ReactDom from 'react-dom'; 
import { Modal } from './components/modal'
import TableContent from './components/table-content';
import TablePageSelector from './components/page-selector';
import axios from 'axios';
import config from "../../tempConfg.json"


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            listAmount: 8,
            currentPage: 1,
            users: [],
            usersInChunks: [],
            refresh: false,
            noResults: false,
            searchKeyWord: '',
        }
    }

    componentDidMount() {
        this.setModalState = this.setModalState.bind(this)
        this.fetchUsers = this.fetchUsers.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.fetchUsers();
    }

    setModalState() {
        this.setState({openModal : this.state.openModal ? !this.state.openModal : true})
    }

    setListAmount = async (e) => {
        var newAmount = parseInt(e.target.innerHTML)
        await this.setModalState()
        var usersInChunks = await this.splitInChunks(this.state.users, newAmount)
        await this.setState({usersInChunks: usersInChunks, listAmount: newAmount, currentPage: this.state.currentPage <= usersInChunks.length ? this.state.currentPage : usersInChunks.length})
        await this.filterListOnKeyWord(this.state.searchKeyWord)
    }

    fetchusers = async () => {
        this.setState({ refresh: true, usersInChunks: [] })
        await axios.get(`${config.baseurl}/api/users/`).then(response => {
            var users = [];
            Object.values(response.data).flat().map((el, id) => users.push(el))
            this.setState({ usersInChunks: this.splitInChunks(users, this.state.listAmount), users })
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

    setCurrentPage(newPage) {
        var newPage = parseInt(newPage)
        this.setState({currentPage: newPage})
    }

    filterListOnKeyWord(keyWord) {
        var usersArray = this.splitInChunks(this.state.users.filter((word) => word.name.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())), this.state.listAmount)
        if(usersArray.length == 0) {
            this.setState({noResults: true, usersInChunks: usersArray, searchKeyWord: keyWord})
        }else {
            this.setState({noResults: false, usersInChunks: usersArray, currentPage: this.state.currentPage <= usersArray.length ? this.state.currentPage : usersArray.length})
        }
    }

    searchbar(keyWord) {
        if(this.state.refresh == true) return
        this.filterListOnKeyWord(keyWord.target.value)
    }

    render() {
        return (
            <div className="d-flex flex-column w-90 h-90" id="container-datatable">
            <div id="table-head" className="mt-3 w-full d-flex justify-content-end align-items-end">
                <div id="table-buttons-container" className="d-flex justify-content-end align-items-end gap-3 pr-3">
                    <input placeholder="Zoeken" onChange={(e) => this.searchbar(e)} className="border-white-1 text-white" id="searchbbar-input"></input>
                    <div id="refresh-datatable" onClick={this.fetchUsers} className={`d-flex transition-350ms justify-content-center align-items-center border-white-1 text-white ${this.state.refresh ? `rotate-360-linair` : ``}`}>
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
                                <span className="font-weight-bold">Rol</span>
                            </div>
                            <div id="head-row" className="head-row-150 head-row-added text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center gap-3">
                                <span className="font-weight-bold">Beheer gebouwen</span>
                            </div>
                            <div id="head-row" className="head-row-edited text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center">
                                <span className="font-weight-bold">Acties</span>
                            </div>
                        </div>
                    </div>
                    <div id="table-body" className="d-flex flex-grow-1 flex-column">
                        {/* <TableContent loading={this.state.refresh} users={ this.state.usersInChunks } searchError={this.state.noResults} listAmount={this.state.listAmount} currentPage={this.state.currentPage -1} /> */}
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
                            {/* <TablePageSelector users={ this.state.usersInChunks } searchError={this.state.noResults} currentPage={this.state.currentPage} setCurrentPage={(e) => { this.setCurrentPage(e) }} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}   

if(document.getElementById("content-wrapper")) {
    ReactDom.render(<Users/>, document.getElementById("content-wrapper"))
}

