import React from 'react';
import {Modal} from './modal'

export default class BodyContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseDown: false,
            elementCreated: false,
            newestElementID: '',
            creatingElement: false,
            createReservationPopupOpen: false,
            modalSaved: false,
        }
    }

    componentDidUpdate() {
        var userSelection = document.getElementsByClassName('reservation-card');

        for(let i = 0; i < userSelection.length; i++) {
          userSelection[i].addEventListener("click", (e) => this.reservationClickHandler(e))
        }
    }

    componentDidMount() {
    }

    setModalState() {
        this.setState(prev => ({createReservationPopupOpen: !prev.createReservationPopupOpen}))
    }

    removeChild() {
        const child = document.getElementById(`${this.state.newestElementID}-reservation`)
        if(child) {
            child.parentNode.removeChild(child)
        }
    }

    saveModal() {
        this.setState({modalSaved: true, createReservationPopupOpen: false})
    }

    reservationClickHandler(event) {
        const reservation = document.getElementById(event.target.id)
        const timepopup = document.getElementById("time-popup")
        timepopup.innerHTML = reservation.getAttribute("data-starttime") + ' - ' + reservation.getAttribute("data-endtime")
    }

    mouseDownHandler(event) {
        (event.target.className == "reservation-card" || event.target.className == "grid-row") && this.setState({ mouseDown: true, newestElementID: '', createReservationPopupOpen: false });
        this.state.modalSaved == false && this.removeChild()
    }

    mouseUpHandler() {
        if(this.state.elementCreated == true) {
            this.setState({ mouseDown: false, elementCreated: false, createReservationPopupOpen: true, modalSaved: false});
        }else {
            this.setState({mouseDown: false, elementCreated: false})
        }
    }

    mouseEvent(event) {
        if(this.state.mouseDown == false) return
        if(this.state.elementCreated == false) {
            this.createElement(event)
        }
        if(!event.target.id.startsWith('row') && event.target.id != `${this.state.newestElementID}-reservation`) return this.setState({mouseDown: false})
        var currentElement = document.getElementById(`${this.state.newestElementID}-reservation`)
        if(currentElement) {
            if(event.target.parentNode.className == "grid-row" && event.target.className == "reservation-card") {
                currentElement.style.height = `${Math.round((event.nativeEvent.offsetY) / 9) * 9}px`
            }else {
                currentElement.style.height = `${Math.round((event.nativeEvent.offsetY - currentElement.style.top.split("px")[0]) / 9) * 9}px`
            }
        }
    }

    createElement(element) {
        if(!element.target.id.startsWith("row") || element.target.className == "reservation-card") return
        var parentElement = document.querySelector(`[data-spaceid='${element.target.id.split("-")[3]}']`)
        var newReservationElement = document.createElement("div")
        var marginTop = (Math.round(element.nativeEvent.offsetY / 9) * 9)
        var randomID = Math.random().toString(16).slice(2)
        newReservationElement.style.backgroundColor = parentElement.style.backgroundColor;
        newReservationElement.style.height = "9px"
        newReservationElement.style.top = marginTop + "px"
        newReservationElement.style.width = parentElement.getBoundingClientRect().width + "px"
        newReservationElement.classList.add("reservation-card")
        newReservationElement.id = `${marginTop}${randomID}-reservation`
        this.setState({newestElementID: `${marginTop}${randomID}`, elementCreated: true})
        var appendElement = document.getElementById(element.target.id)
        appendElement.appendChild(newReservationElement)
    }

    render() {
        return(
            <div className="time-grid-item gap-1 d-flex justify-content-between">
                {
                this.props.childElements && this.props.childElements.map((building, indexBuilding) => {
                    return (
                            building.spaces.map((space, index) => {
                                return (
                                    <div
                                        key={space.width + index + building.backgroundColor} 
                                        className="grid-row"
                                        onMouseUp={(e) => this.mouseUpHandler(e)} 
                                        onMouseDown={(e) => this.mouseDownHandler(e)}
                                        onPointerMoveCapture={(e) => this.mouseEvent(e)}
                                        id={`row-${index}-spaceID-${space.spaceID}`} 
                                        style={{width: space.width, height: 576}}>
                                            {
                                                space.reservations.map((reservation, resIndex) => {
                                                    if(reservation.date == this.props.currentDate || reservation.starttime < reservation.endtime) {
                                                        var start = reservation.starttime.split(":")
                                                        var end = reservation.endtime.split(":")
                                                        var cardMarginTop = ((start[0] -8) * 36) + (Math.round(start[1] / 15) * 9)
                                                        var cardHeight = ((((end[0] - start[0]) * 4) + ((Math.round(end[1]) - Math.round(start[1])) / 15)) * 9) - 1
                                                        if(cardHeight < 577) {
                                                            return ( 
                                                                <div className="reservation-card d-flex flex-column justify-content-around align-items-center" id={Math.random().toString(16).slice(2)} data-starttime={`${start[0]}-${Math.round(start[1] / 15) * 15}`} data-endtime={`${end[0]}-${Math.round(end[1] / 15) * 15}`} key={space.width + resIndex} style={{top: cardMarginTop + 1, width: space.width, backgroundColor: building.backgroundColor, height: cardHeight}}>
                                                                    <span style={{fontSize: '0.6vw'}}>{reservation.title}</span>
                                                                    <span style={{fontSize: '0.6vw'}}>{reservation.starttime} - {reservation.endtime}</span>
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                })
                                            }
                                    </div>
                                )
                            })
                        )
                    })
                }
                <Modal 
                    marginLeft={document.getElementById(`${this.state.newestElementID}-reservation`) ? document.getElementById(`${this.state.newestElementID}-reservation`).getBoundingClientRect().left : ''} 
                    marginTop={document.getElementById(`${this.state.newestElementID}-reservation`) ? document.getElementById(`${this.state.newestElementID}-reservation`).offsetTop : ''} 
                    openModal={this.state.createReservationPopupOpen}
                    saveModal={() => this.saveModal()} 
                />
            </div>
        )

    }
}
