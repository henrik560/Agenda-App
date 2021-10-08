import React from 'react';
import ReactDom from 'react-dom'; 
import Dropdown  from './components/dropdown';
import Header from './components/header';
import BodyContent from './components/body-content';
import axios from 'axios';
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
            day: ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00"],
            fetchedSpacesFromDom: false,
            childElementsSpaces: [],
            buildings: [],
        }
        this.renderDaysInMonthArray = this.renderDaysInMonthArray.bind(this)
        this.changeDate = this.changeDate.bind(this)
        this.fetchBuildings - this.fetchBuildings.bind(this)
        this.fetchBuildings()
    }

    renderDaysInMonthArray() {
        var daysInMonthArray = []
        for (let i = 1; i <= new Date(this.year, this.month + 1, 0).getDate(); i++) {
            daysInMonthArray.push(i) 
        }
        return daysInMonthArray
    }

    fetchBuildings = async () => {
        await axios.get('api/buildings/').then(response => {
            var buildings = [] 
            var childElementsSpaces = [];
            Object.values(response.data).map((el, id) => { buildings.push(el) })
            buildings.flat().forEach((building) => {
                var spaceWithReservation = []
                building.spaces.forEach((space) => {
                    spaceWithReservation[space.id] = []
                    spaceWithReservation[space.id]["reservations"] = []
                    space.reservations.forEach((reservation) => {
                        spaceWithReservation[space.id]["reservations"].push(reservation)
                    })
                })  
                childElementsSpaces.push(spaceWithReservation)
            })
            this.setState({ buildings, childElementsSpaces })
        });
    }

    changeDate(dateType, newDate) {
        var validTypes = ["current_year", "current_month", "current_day"]
        if(validTypes.includes(dateType.toLowerCase()) && typeof newDate == "string") {
            this.setState({[dateType]: newDate})
        }
    }

    componentDidUpdate() {
        if(this.state.fetchedSpacesFromDom == false) {
            var childElementsSpaces = this.state.childElementsSpaces;
            [...document.getElementsByClassName("space-row")].forEach((element) => {
                const elementID = element.getAttribute("data-spaceid")
                childElementsSpaces[elementID].push(["width"])
            })
            this.setState({childElementsSpaces, fetchedSpacesFromDom: true})
        }
    }
 
    render() {
        return (
        <div className="agenda mb-3 d-flex justify-content-center"> 
            <div className="content-header-wrapper d-flex justify-content-between">
                <div className="header-date d-flex w-10 width-190px justify-content-center align-items-center h-0 fs-5 bg-themeColor text-white">
                    <span className="day mr-2 height-45px d-flex justify-content-center align-items-center">{this.state.current_day}</span>
                    <span className="month mr-2 height-45px d-flex justify-content-center align-items-center">{this.state.current_month}</span>
                    <span className="year height-45px d-flex justify-content-center align-items-center">{this.state.current_year}</span>
                </div>
                <div className="content-header d-flex flex-row justify-content-between">
                    <Dropdown list={this.state.list_year} changeData={this.changeDate} dataTarget="year-dropdown" dateType="current_year" titleName="Jaar"/>
                    <Dropdown list={this.state.list_month} changeData={this.changeDate} dataTarget="month-dropdown" dateType="current_month" titleName="Maand"/>
                    <Dropdown list={this.state.list_day} changeData={this.changeDate} dataTarget="day-dropdown" dateType="current_day" titleName="Dag"/>
                </div>
            </div>
            <div className="agenda-child-container">
                <div className="header-container">
                    <div className="fake-header-time-item"></div>
                    <div className="sticky-header">
                        <Header buildings={this.state.buildings}/>
                    </div>
                </div>
                <div className="content-container">
                    <div className="time-container">
                        {this.state.day.map((time) => {
                            return (<span key={time}>{`${time}:00`}</span>)
                        })}
                    </div>
                    <div className="time-grid flex-grow-1">
                        <BodyContent childElements={this.state.childElementsSpaces}/>
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

