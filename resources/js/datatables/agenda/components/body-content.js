import React from 'react';

export default class BodyContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseDown: false,
            elementCreated: false,
            newestElementID: '',
            creatingElement: false,
        }
    }

    componentDidUpdate() {
        var userSelection = document.getElementsByClassName('reservation-card');

        for(let i = 0; i < userSelection.length; i++) {
          userSelection[i].addEventListener("click", (e) => this.reservationClickHandler(e))
        }
    }

    reservationClickHandler(event) {
        const reservation = document.getElementById(event.target.id)
        const timepopup = document.getElementById("time-popup")
        timepopup.innerHTML = reservation.getAttribute("data-starttime") + ' - ' + reservation.getAttribute("data-endtime")
    }

    mouseDownHandler(event) {
        this.setState({ mouseDown: true, newestElementID: '' });
    }

    mouseUpHandler() {
        this.setState({ mouseDown: false, elementCreated: false });
    }

    mouseEvent(event) {
        if(this.state.mouseDown == false) return
        if(this.state.elementCreated == false) {
            this.createElement(event)
        }
        var currentElement = document.getElementById(`${this.state.newestElementID}-reservation`)
        if(currentElement) {
            if(event.target.parentNode.className == "grid-row" && event.target.className == "reservation-card") {
                currentElement.style.height = `${event.nativeEvent.offsetY}px`
            }else {
                currentElement.style.height = `${event.nativeEvent.offsetY - currentElement.style.marginTop.split("px")[0]}px`
            }
        }
    }

    createElement(element) {
        console.log(element)
        var parentElement = document.querySelector(`[data-spaceid='${element.target.id.split("-")[3]}']`)
        var newReservationElement = document.createElement("div")
        var marginTop = (Math.round(element.nativeEvent.offsetY / 15) * 15)
        var closestOffset = 0;
        var randomID = Math.random().toString(16).slice(2)
        if(element.target.children.length > 0) {
            for(const child of element.target.children) {
                if(child.offsetTop > closestOffset) closestOffset = child.offsetTop
                console.log(child.offsetTop)
            }
            closestOffset > marginTop ? marginTop = 0 : marginTop = marginTop - closestOffset
        }
        newReservationElement.style.backgroundColor = parentElement.style.backgroundColor;
        newReservationElement.style.height = "1px"
        newReservationElement.style.marginTop = marginTop + "px"
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
                    var lastElementEndTime = Number
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
                                                    if(reservation.date == this.props.currentDate && reservation.starttime < reservation.endtime) {
                                                        var start = reservation.starttime.split(":")
                                                        var end = reservation.endtime.split(":")
                                                        var cardMarginTop = resIndex == 0 ? ((start[0] -8) * 36) + (Math.round(start[1] / 15) * 9) : ((start[0] * 4 + Math.round(start[1] / 15)) - (lastElementEndTime.split(":")[0] * 4 + Math.round(lastElementEndTime.split(":")[1] / 15))) * 9
                                                        var cardHeight = ((((end[0] - start[0]) * 4) + ((Math.round(end[1]) - Math.round(start[1])) / 15)) * 9) - 1
                                                        lastElementEndTime = `${end[0]}:${end[1]}`;
                                                        if(cardHeight < 577) {
                                                            return ( 
                                                                <div className="reservation-card d-flex flex-column justify-content-around align-items-center" id={Math.random().toString(16).slice(2)} data-starttime={`${start[0]}-${Math.round(start[1] / 15) * 15}`} data-endtime={`${end[0]}-${Math.round(end[1] / 15) * 15}`} key={space.width + resIndex} style={{marginTop: cardMarginTop + 1, width: space.width, backgroundColor: building.backgroundColor, height: cardHeight}}>
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
                {/* <div className="position-absolute dg-dark h-25 w-25 zindex-tooltip d-flex justify-content-center align-items-center text-white">
                    <span id="time-popup"></span>
                </div> */}
            </div>
        )

    }
}
