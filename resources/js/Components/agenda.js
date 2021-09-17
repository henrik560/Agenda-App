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
        this.renderDaysInMonthArray = this.renderDaysInMonthArray.bind(this)
        this.changeDate = this.changeDate.bind(this)
    }

    renderDaysInMonthArray() {
        var daysInMonthArray = []
        for (let i = 1; i <= new Date(this.year, this.month + 1, 0).getDate(); i++) {
            daysInMonthArray.push(i) 
        }
        return daysInMonthArray
    }

    changeDate(dateType, newDate) {
        var validTypes = ["current_year", "current_month", "current_day"]
        if(validTypes.includes(dateType.toLowerCase()) && typeof newDate == "string") {
            this.setState({dateType: newDate})
        }
    }

    render() {
        return (
        <div className="agenda d-flex justify-content-center"> 
            <div className="content-header-wrapper d-flex justify-content-between">
                <div className="header-date d-flex w-10 h-0 fs-3">
                    <span className="day mr-2">{this.state.current_day}</span>
                    <span className="month mr-2">{this.state.current_day}</span>
                    <span className="year">{this.state.current_year}</span>
                </div>
                <div className="content-header d-flex flex-row justify-content-between">
                    <Dropdown list={this.state.list_year} changeData={this.changeDate} dataTarget="year-dropdown" dateType="current_year" titleName="Jaar"/>
                    <Dropdown list={this.state.list_month} changeData={this.changeDate} dataTarget="month-dropdown" dateType="current_month" titleName="Maand"/>
                    <Dropdown list={this.state.list_day} changeData={this.changeDate} dataTarget="day-dropdown" dateType="current_day" titleName="Dag"/>
                </div>
            </div>
            {/* <div className="content-body">
                <div className="content-body-header">
                    <div className="buildings-list">
                        <Header />
                    </div>
                </div>
            </div>  */}
        </div>
        )
    }
}   

if(document.getElementById("agenda-wrapper")) {
    ReactDom.render(<Agenda/>, document.getElementById("agenda-wrapper"))
}

