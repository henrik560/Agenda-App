import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header'

export default class AgendaBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00"]
        }
    }

    render() {
        return(
            <div id="agenda-content-container">
                <div className="buildings-wrapper">
                    <Header />
                </div>
                <div className="agenda-content border-left-none border-bottom-none d-flex flex-row flex-grow-1" style={{width: "100px"}}>
                    <div className="agenda-time-line d-flex flex-column gap-1 flex-grow-1">
                    {/* <div id="time-container-fake" className="last-item-border-none text-center"></div> */}
                        {this.state.day.map((time) => {
                            return (<div id="time-container" className="last-item-border-none text-center" key={time}>{`${time}:00`}</div>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}