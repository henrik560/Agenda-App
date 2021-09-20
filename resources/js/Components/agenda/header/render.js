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
                <div className="d-inline-block w-full flex-grow-1">
                    <div className="d-flex flex-column justify-content-center" key={element.id}>
                        <div>
                            <div className="buildings-list-item-header d-flex justify-content-center">
                                <span>{element.name}</span>
                            </div>  
                            <div className="d-flex justify-content-around">
                                {element.rooms.map(room => {
                                    return (<span style={{width : "150px"}} className="d-flex justify-content-center">{room.name}</span>)
                                })}
                            </div> 
                        </div>  
                    </div>
                </div>
                )
            })
        }
        return(
            <div className="w-full h-full d-block">{ buildingsElements || "" }</div>
        )
    }   

}