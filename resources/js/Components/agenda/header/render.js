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
                    // `#${element.hex}` || 
                <div className="d-flex flex-column justify-content-center flex-grow-1 gap-1" key={element.id}>
                        <div style={{backgroundColor: '#32a834'}} className="buildings-list-item-header d-flex justify-content-center">
                            <span>{element.name}</span>
                        </div>  
                        <div className="d-flex justify-content-around gap-1">
                            {element.rooms.map(room => {
                                return (<span style={{backgroundColor: '#32a834'}} className="d-flex justify-content-center flex-grow-1">{room.name}</span>)
                            })}
                        </div> 
                </div>
                )
            })
        }
        return(
            <div className="w-full h-full d-flex justify-content-between gap-1 border-white-3 border-top-none border-right-none">{ buildingsElements || "" }</div>
        )
    }   

}