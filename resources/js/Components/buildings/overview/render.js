import React from 'react';
import ReactDom from 'react-dom'; 
import { Modal } from './buildings/overview/modal'
import TableContent from './buildings/overview/table-content';
import TablePageSelector from './buildings/overview/page-selector';
import axios from 'axios';
const config = require("../../../tempConfg.json");

class BuildingsOverview extends React.Component {
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
            searchKeyWord: '',
        }
    }

    componentDidMount() {
        this.setModalState = this.setModalState.bind(this)
        this.fetchBuildings = this.fetchBuildings.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.fetchBuildings();
    }

    fetchBuildings = async () => {
        this.setState({ refresh: true, buildingsInChunks: [] })
        await axios.get(`${config.baseurl}/api/buildings/all`).then(response => {
            var buildings = [];
            Object.values(response.data).flat().map((el, id) => buildings.push(el))
            this.setState({ buildingsInChunks: this.splitInChunks(buildings, this.state.listAmount), buildings })
        })
        this.setState({refresh: false})
    }
}