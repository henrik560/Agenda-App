import React from 'react';
import ReactDom from 'react-dom'; 

class Agenda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            available_years: { test: "1", test3: "3"},
            current_year: new Date().getFullYear(),
            current_month: new Date().getMonth() + 1,
            current_day: new Date().getDate()
        }
    }

    render() {
        return (
        <div className="agenda"> 
            <div className="content-header">
                <select className="year-selector">
                    <option>{this.state.current_year}</option>
                    <option>{this.state.current_year}</option>
                    <option>{this.state.current_year}</option>
                    <option>{this.state.current_year}</option>
                </select>
                <div classNAme="month-selector">{this.state.current_month}</div>
                <div classNAme="day-selector">{this.state.current_day}</div>
            </div>
        </div>
        )
    }
}

if(document.getElementById("agenda-wrapper")) {
    ReactDOM.render(<Agenda/>, document.getElementById("agenda-wrapper"))
}

