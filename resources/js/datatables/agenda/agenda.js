import React from 'react';
import ReactDom from 'react-dom'; 
import Dropdown  from './components/dropdown';
import Header from './components/header';
import BodyContent from './components/body-content';
import axios from 'axios';
import { locale } from 'moment';
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
    }

    renderDaysInMonthArray() {
        var daysInMonthArray = []
        for (let i = 1; i <= new Date(this.year, this.month + 1, 0).getDate(); i++) {
            daysInMonthArray.push(i) 
        }
        return daysInMonthArray
    }

    fetchBuildings = async () => {
        //agendaChildElementsSpaces
        //agendaBuildings
        if(localStorage.getItem("agendaBuildings") && localStorage.getItem("agendaChildElementsSpaces")) {
            if(localStorage.getItem("agendaBuildings")) {
                this.setState({buildings: JSON.parse(localStorage.getItem("agendaBuildings"))})
            }
            if(localStorage.getItem("agendaChildElementsSpaces")) {
                this.setState({childElementsSpaces: JSON.parse(localStorage.getItem("agendaChildElementsSpaces"))})
            }
        }else {
            await axios.get('api/users/').then(response => {
                var buildings = [] 
                var childElementsSpaces = [];
                Object.values(response.data)[0][0].user_has_buildings.map((el, id) => { buildings.push(el.building) })
                buildings.forEach((building) => {
                    building.spaces.forEach((space) => {
                        childElementsSpaces[space.id] = {}
                        childElementsSpaces[space.id].reservations = []
                        childElementsSpaces[space.id].width = Number;
                        space.reservations.forEach((reservation) => {
                            childElementsSpaces[space.id].reservations.push(reservation)
                        })
                    })
                })
                this.setState({ buildings, childElementsSpaces })
                localStorage.setItem("agendaBuildings", JSON.stringify(this.state.buildings))
            });
        }
    }

    changeDate(dateType, newDate) {
        var validTypes = ["current_year", "current_month", "current_day"]
        if(validTypes.includes(dateType.toLowerCase()) && typeof newDate == "string") {
            this.setState({[dateType]: newDate})
        }
    }

    componentDidMount() {
        this.fetchBuildings()
    }

    componentDidUpdate() {
        if(this.state.fetchedSpacesFromDom == false) {
            var childElementsSpaces = this.state.childElementsSpaces;
            [...document.getElementsByClassName("space-row")].forEach((element) => {
                const elementID = element.getAttribute("data-spaceid")
                childElementsSpaces[elementID]["width"] = element.clientWidth
            })
            this.setState({childElementsSpaces, fetchedSpacesFromDom: true})
            setTimeout(() => {
                localStorage.setItem("agendaChildElementsSpaces", JSON.stringify(childElementsSpaces))
            }, 100);
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
                            return (
                                <div className="time-item">
                                    <div className="time-item-container">
                                        <span key={time}>{`${time}:00`}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div id="time-grid-inner" className="time-grid flex-grow-1">
                        <BodyContent childElements={this.state.childElementsSpaces} currentDate={`${this.state.current_year}-${this.month}-${this.state.current_day}`}/>
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

