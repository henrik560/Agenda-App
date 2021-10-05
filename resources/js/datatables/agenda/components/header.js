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
        await axios.get('api/buildings/get').then(response => this.setState({buildings: response.data}));
        var buildings = [];
        Object.values(this.state.buildings).flat().map((el, id) => buildings.push(el))
        this.setState({ buildings })
    }

    render() {
        // if(this.state.buildings.length > 0) {
        //     var buildingsElements = this.state.buildings.map((element, index) => {
        //         return (
        //         <div className="d-flex flex-column justify-content-center flex-grow-1 gap-1" key={element.id}>
        //                 <div style={{backgroundColor: '#32a834'}} className="buildings-list-item-header d-flex justify-content-center">
        //                     <span>{element.name}</span>
        //                 </div>  
        //                 <div className="d-flex justify-content-around gap-1">
        //                     {element.rooms.map(room => {
        //                         return (<span style={{backgroundColor: '#32a834'}} className="d-flex justify-content-center flex-grow-1">{room.name}</span>)
        //                     })}
        //                 </div> 
        //         </div>
        //         )
        //     })
        // }
        return(
            <div id="header-spaces-container" className="w-full h-full position-fixed d-flex flex-grow-1 justify-content-between gap-1">
                <div className="fake-time-container"></div>
                <div className="d-flex flex-column justify-content-center flex-grow-1 gap-1">
                    <div style={{backgroundColor: '#32a832'}} className="buildings-list-item-header d-flex justify-content-center">
                        <span>Test 1</span>
                    </div>  
                    <div className="d-flex justify-content-around gap-1">
                        <span style={{backgroundColor: '#32a833'}} className="d-flex justify-content-center flex-grow-1">Test1</span>
                        <span style={{backgroundColor: '#32a834'}} className="d-flex justify-content-center flex-grow-1">Test2</span>
                        <span style={{backgroundColor: '#32a835'}} className="d-flex justify-content-center flex-grow-1">Test3</span>
                    </div> 
                </div>
                <div className="d-flex flex-column justify-content-center flex-grow-1 gap-1">
                    <div style={{backgroundColor: '#62b832'}} className="buildings-list-item-header d-flex justify-content-center">
                        <span>Test 2</span>
                    </div>  
                    <div className="d-flex justify-content-around gap-1">
                        <span style={{backgroundColor: '#62b832'}} className="d-flex justify-content-center flex-grow-1">Test1</span>
                        <span style={{backgroundColor: '#62b832'}} className="d-flex justify-content-center flex-grow-1">Test3</span>
                    </div> 
                </div>
            </div>
        )
    }   

}