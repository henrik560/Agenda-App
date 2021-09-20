import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header/render'

export default class AgendaBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00"]
        }
    }

    // {this.state.day.map((time) => {
    //     return (<div key={time}>{`${time}:00`}</div>)
    // })}

    render() {

        return(
            <div className="ml-7 buildings-wrapper">
                <Header />
            </div>
        )
    }
}