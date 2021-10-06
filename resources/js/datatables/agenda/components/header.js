import axios from 'axios';
import React, { Children } from 'react';

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
        await axios.get('api/buildings/').then(response => {
            var buildings = [];
            Object.values(response.data).map((el, id) => { buildings.push(el) })
            this.setState({ buildings })
            this.props.fetchedData()
        });
     
    }

    render() {
        if(this.state.buildings.length > 0) {
            var element = this.state.buildings[0].map((building, index) => {
                return (<div key={index} className="d-flex flex-column justify-content-center flex-grow-1 gap-1">
                    <div style={{backgroundColor: `#${building.color_hex}`}} className="buildings-list-item-header d-flex text-truncate justify-content-center">
                        <span id="text-truncate-with-flex">{building.name}</span>
                    </div>  
                        <div className="d-flex justify-content-around gap-1">
                            {
                                building.spaces.map((space, index) => {
                                    return ( 
                                            <span key={index} style={{backgroundColor: `#${building.color_hex}`}} className="space-row d-flex justify-content-center flex-grow-1">{space.name}</span>
                                    )
                                })
                            }
                        </div> 
                    </div>
                )
            })
        }
        return(
            <div id="header-spaces-container" className="w-full mr-1 h-full d-flex flex-grow-1 justify-content-between gap-1">
                {element || ''}
            </div>
        )
    }   

}