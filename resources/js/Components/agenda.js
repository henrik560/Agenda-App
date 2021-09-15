import React from 'react';
import ReactDom from 'react-dom'; 
import Dropdown  from './agenda/dropdown';
import Header from './agenda/header/render'
const moment = require('moment');
moment.locale("nl")



class Agenda extends React.Component {
    constructor(props) {
        super(props);
        this.date = new Date(),
        this.month = this.date.getMonth() + 1,
        this.year = this.date.getFullYear(),
        this.state = {
            current_year: this.date.getFullYear(),
            current_month: this.date.toLocaleString('default', { month: 'long' }),
            current_day: this.date.getDate(),
            list_year : [
                this.date.getFullYear(),
                this.date.getFullYear() + 1,
                this.date.getFullYear() + 2,
                this.date.getFullYear() + 3
            ],
            list_month : moment.months(),
            list_day : this.renderDaysInMonthArray(),
        }
    }

    renderDaysInMonthArray() {
        var daysInMonthArray = []
        for (let i = 1; i <= new Date(this.year, this.month + 1, 0).getDate(); i++) {
            daysInMonthArray.push(i) 
        }
        return daysInMonthArray
    }

    render() {
        return (
        <div className="agenda"> 
            <div className="content-header">
                <Dropdown list={this.state.list_year} dataTarget="year-dropdown" titleName="Jaar"/>
                <Dropdown list={this.state.list_month} dataTarget="month-dropdown" titleName="Maand"/>
                <Dropdown list={this.state.list_day} dataTarget="day-dropdown" titleName="Dag"/>
            </div>
            <div className="content-body">
                <div className="content-body-header">
                    <div className="buildings-list">
                        <Header />
                    </div>
                </div>
            </div>
        </div>
        )
    }
}   

if(document.getElementById("agenda-wrapper")) {
    ReactDom.render(<Agenda/>, document.getElementById("agenda-wrapper"))
}

