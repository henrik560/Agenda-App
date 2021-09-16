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
        Object.values(this.state.buildings).flat().map((el, id) => buildings.push(el))
        this.setState({ buildings })
    }

    render() {
        if(this.state.buildings.length > 0) {
            var buildingsElements = this.state.buildings.map((element, index) => {
                return (
                <div key={element.id}>
                    <div className="buildings-list-item-header">
                        <span>{element.name}</span>
                    </div>   
                    <div className="rooms-list-item-">
                    
                    </div>
                </div>
                )
            })
        }
        return(
            <div className="buildings-list-wrapper">{ buildingsElements || "" }</div>
        )
    }   

}