import axios from 'axios';
import { getJSON } from 'jquery';
import React from 'react';
import ReactDom from 'react-dom'; 

export default class header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buildings: this.fetchBuildings,
        }
        this.fetchBuildings = this.fetchBuildings.bind(this);
    }

    fetchBuildings = async () => {
        // axios.get('api/agenda/buildings/get').then(response => this.setState({buildings: response.data}))
        axios.get('api/agenda/buildings/get').then(response => console.log(response.data))
    }

    render() {
        return(
            <div className="rooms-list-wrapper">
                {/* {this.state.buildings.map((el, id) => {
                    <div>{}</div>
                }) } */}
            </div>
        )
    }

}