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
            succesBoxOpen: false,
            errorBoxOpen: false,
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

    setBoxStatus(box) {
        if(box == "error") {
            this.setState(prev => ({errorBoxOpen: !prev.errorBoxOpen}))
        }else if (box== "succes") {
            this.setState(prev => ({succesBoxOpen: !prev.succesBoxOpen}))
        }
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
            await axios.get(`api/users/${document.getElementById("userID") ? document.getElementById("userID").value : ''}`).then(response => {
                var buildings = [] 
                var childElementsSpaces = [];
                Object.values(response.data)[0][0].user_has_buildings.map((el, id) => { if(el.building != null) { buildings.push(el.building) } })
                    buildings.forEach((building) => {
                        if(building && building.spaces.length > 0) {
                            var bID = building.id
                            childElementsSpaces[bID] = []
                            childElementsSpaces[bID]["spaces"] = []
                            childElementsSpaces[bID]["backgroundColor"] = ""
                            building.spaces.forEach((space) => {
                                childElementsSpaces[bID]["spaces"][space.id] = []
                                childElementsSpaces[bID]["spaces"][space.id]["spaceID"] = ""
                                childElementsSpaces[bID]["spaces"][space.id]["width"] = ""
                                childElementsSpaces[bID]["spaces"][space.id]["reservations"] = []
                                childElementsSpaces[bID]["spaces"][space.id].push(space)
                                space.reservations.forEach((reservation) => {
                                    childElementsSpaces[bID]["spaces"][space.id]["reservations"].push(reservation)
                                })
                            })
                        }
                    })
                this.setState({ buildings, childElementsSpaces })
                // localStorage.setItem("agendaBuildings", JSON.stringify(this.state.buildings))
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
                const elementID = element.getAttribute("data-buildingid")
                const spaceID = element.getAttribute("data-spaceID")
                childElementsSpaces[elementID]["spaces"][spaceID]["width"] = element.getBoundingClientRect().width
                childElementsSpaces[elementID]["backgroundColor"] = element.style.backgroundColor
                childElementsSpaces[elementID]["spaces"][spaceID]["spaceID"] = spaceID
            })
            this.setState({childElementsSpaces, fetchedSpacesFromDom: true})
            setTimeout(() => {
                // localStorage.setItem("agendaChildElementsSpaces", JSON.stringify(childElementsSpaces))
            }, 100);
        }
        
    }
 
    render() {
        return (
        <div className="agenda mb-3 d-flex justify-content-center"> 
            {/* Reservation box wrappers */}
                {/* Reservation succes box */}
                {
                    this.state.succesBoxOpen && (
                        <div className="reservation-box-wrapper">
                            <div className="reservation-succes-box d-flex flex-column">
                                <div className="box-header w-100 d-flex justify-content-end align-items-end ">
                                    <i className="fas fa-times mr-3 mt-3" onClick={() => this.setBoxStatus("succes")}></i>
                                </div>
                                <div className="box-body d-flex w-100">
                                    <div className="box-body-message d-flex flex-column mt-2 w-100 justify-content-center align-items-center">
                                        <span className="box-body-title">Succes!</span>
                                        <span className="box-body-desc">Uw reservering is succesvol geplaatst.</span>
                                        <div className="body-image d-flex justify-content-center align-items-center mt-4">
                                            <img src="/images/checked.png" width="35%"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <button className="box-footer-button" onClick={() => this.setBoxStatus("succes")} style={{backgroundColor: '#32ba7c'}}>Doorgaan</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                
                {/* Reservation error box  */}
                {
                    this.state.errorBoxOpen && (
                        <div className="reservation-box-wrapper">
                            <div className="reservation-error-box d-flex flex-column">
                                <div className="box-header w-100 d-flex justify-content-end align-items-end ">
                                    <i className="fas fa-times mr-3 mt-3" onClick={() => this.setBoxStatus("error")}></i>
                                </div>
                                <div className="box-body d-flex w-100">
                                    <div className="box-body-message d-flex flex-column mt-2 w-100 justify-content-center align-items-center">
                                        <span className="box-body-title">Error!</span>
                                        <span className="box-body-desc">Er is iets fout gegaan bij het plaatsen van uw reservering.</span>
                                        <div className="body-image d-flex justify-content-center align-items-center mt-4">
                                            <img src="/images/cancel.png" width="35%"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <button onClick={() => this.setBoxStatus("error")} className="box-footer-button" style={{backgroundColor: '#e24c4b'}}>Opnieuw</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                
 
            <div className="content-header-wrapper d-flex justify-content-between">
                <div className="header-date d-flex w-10 width-190px justify-content-center align-items-center h-0 fs-6 fw-bold ">
                    <span className="day mr-2 d-flex justify-content-center align-items-center">{this.state.current_day}</span>
                    <span className="month mr-2 d-flex justify-content-center align-items-center">{this.state.current_month}</span>
                    <span className="year d-flex justify-content-center align-items-center">{this.state.current_year}</span>
                </div>
                <div className="content-header d-flex flex-row justify-content-between">
                    <Dropdown key="year" list={this.state.list_year} changeData={this.changeDate} dataTarget="year-dropdown" dateType="current_year" titleName="Jaar"/>
                    <Dropdown key="month" list={this.state.list_month} changeData={this.changeDate} dataTarget="month-dropdown" dateType="current_month" titleName="Maand"/>
                    <Dropdown key="day" list={this.state.list_day} changeData={this.changeDate} dataTarget="day-dropdown" dateType="current_day" titleName="Dag"/>
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
                    <div className="time-line-end-disabler"></div>
                    <div className="time-container">
                        {this.state.day.map((time, index) => {
                            return (
                                <div key={time + time} className="time-item">
                                    <div key={time + index} className="time-item-container">
                                        <span key={time}>{`${time}:00`}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div id="time-grid-inner" className="time-grid flex-grow-1">
                        <BodyContent onReservationCreate={(box) => this.setBoxStatus(box)} childElements={this.state.childElementsSpaces} currentDate={`${this.state.current_year}-${this.month}-${this.state.current_day}`}/>
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

