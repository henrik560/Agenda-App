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

    render() {
        return(
            <div className="border-white-3">
                <div className="buildings-wrapper">
                    <Header />
                </div>
                <div className="agenda-content border-white-3 border-left-none border-bottom-none d-flex flex-row flex-grow-1" style={{width: "100px"}}>
                    <div className="agenda-time-line d-flex flex-column gap-1 flex-grow-1">
                        {this.state.day.map((time) => {
                            return (<div className="last-item-border-none text-center border-white-2 border-top-none border-left-none border-right-none" key={time}>{`${time}:00`}</div>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}