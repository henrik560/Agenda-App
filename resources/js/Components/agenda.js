import React from 'react';
import ReactDom from 'react-dom'; 
import Dropdown  from './agenda/dropdown';

class Agenda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_year: new Date().getFullYear(),
            current_month: new Date().toLocaleString('default', { month: 'long' }),
            current_day: new Date().getDate(),
            list_year : [
                {
                    name: new Date().getFullYear()
                },
                {
                    name: new Date().getFullYear() + 1
                },
                {
                    name: new Date().getFullYear() + 2
                },
                {
                    name: new Date().getFullYear() + 3
                },
            ],
            list_month : [],
            list_day : [],
        }
    }

    render() {
        return (
        <div className="agenda"> 
            <div className="content-header">
                <Dropdown list={this.state.list_year} titleName="Jaar"/>
                <Dropdown list={this.state.list_month} titleName="Maand"/>
                <Dropdown list={this.state.list_day} titleName="Dag"/>
                <div className="month-selector">{this.state.current_month}</div>
                <div className="day-selector">{this.state.current_day}</div>
            </div>
        </div>
        )
    }
}   

if(document.getElementById("agenda-wrapper")) {
    ReactDom.render(<Agenda/>, document.getElementById("agenda-wrapper"))
}

