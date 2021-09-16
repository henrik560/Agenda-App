import axios from 'axios';
import React from 'react';

export default class header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buildings: [],
        }
        this.fetchBuildings = this.fetchBuildings.bind(this);
        this.fetchBuildings();
    }

    fetchBuildings = async () => {
        await axios.get('api/agenda/buildings/get').then(response => this.setState({buildings: response.data}));
        var buildings = [];
        var buildingsElement = [];
        Object.values(this.state.buildings).flat().map((el, id) => buildings.push(el))
        this.setState({buildings})
        buildings.map((element, index) => {
            
        })
    }

    render() {
        return(
            <div className="buildings-list-wrapper">
            </div>
        )
    }   

}