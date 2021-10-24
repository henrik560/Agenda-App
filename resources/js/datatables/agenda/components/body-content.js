import React from 'react';

export default class BodyContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseDown: true,
            elementCreated: false,
            newestElementID: ''
        }
    }

    componentDidMount() {
        var reservations = document.getElementsByClassName("reservation-card")
        for (let index = 0; index < reservations.length; index++) {
            reservations[index].addEventListener("click", this.state.reservationClickHandler)
        }
        
    }

    reservationClickHandler() {
        console.log("test")
    }

    mouseDownHandler(event) {
        this.setState(prevState => ({ mouseDown: !prevState.mouseDown }));
    }

    mouseUpHandler() {
        this.setState(prevState => ({ mouseDown: !prevState.mouseDown, elementCreated: false }));
    }

    mouseEvent(event) {
        if(this.state.mouseDown == true || event.target.className == 'reservation-card') return
        if(this.state.elementCreated == false) {
            this.createElement(event)
            this.setState({elementCreated: true});

        }
        var currentElement = document.getElementById(`${this.state.newestElementID}-reservation`)
        if(currentElement) currentElement.style.height = `${event.nativeEvent.offsetY - currentElement.style.marginTop.split("px")[0]}px`
    }

    createElement(element) {
        var parentElement = document.querySelector(`[data-spaceid='${element.target.id.split("-")[3]}']`)
        var newReservationElement = document.createElement("div")
        newReservationElement.style.backgroundColor = parentElement.style.backgroundColor;
        newReservationElement.style.height = "1px"
        newReservationElement.style.marginTop = (Math.round(element.nativeEvent.offsetY / 15) * 15) + "px"
        newReservationElement.classList.add("reservation-card")
        newReservationElement.id = `${element.target.id}-reservation`
        this.setState({newestElementID: element.target.id})
        var appendElement = document.getElementById(element.target.id)
        appendElement.appendChild(newReservationElement)
    }

    render() {
        return(
            <div className="time-grid-item gap-1 d-flex justify-content-between">
                {
                this.props.childElements && this.props.childElements.slice(1).map((element, index) => {
                    var lastElementEndTime = Number;
                    return (
                        element && element.width && <div 
                            key={element.width + index + element.backgroundColor} 
                            className="grid-row"
                            onMouseUp={(e) => this.mouseUpHandler(e)} 
                            onMouseDown={(e) => this.mouseDownHandler(e)}
                            onPointerMoveCapture={(e) => this.mouseEvent(e)}
                            id={`row-${index}-spaceID-${element.spaceID}`} 
                            style={{width: element.width, height: 576}}>
                                { 
                                    element.reservations.map((reservation, resIndex) => {
                                        if(reservation.date == this.props.currentDate && reservation.starttime < reservation.endtime) {
                                            var start = reservation.starttime.split(":")
                                            var end = reservation.endtime.split(":")
                                            var cardMarginTop = resIndex == 0 ? ((start[0] -8) * 36) + (Math.round(start[1] / 15) * 9) : ((start[0] * 4 + Math.round(start[1] / 15)) - (lastElementEndTime.split(":")[0] * 4 + Math.round(lastElementEndTime.split(":")[1] / 15))) * 9
                                            var cardHeight = ((((end[0] - start[0]) * 4) + ((Math.round(end[1]) - Math.round(start[1])) / 15)) * 9) - 1
                                            lastElementEndTime = `${end[0]}:${end[1]}`;
                                            if(cardHeight < 577) {
                                                return ( 
                                                    <div className="reservation-card d-flex flex-column justify-content-around align-items-center" key={element.width + resIndex} style={{marginTop: cardMarginTop + 1, width: element.width, backgroundColor: element.backgroundColor, height: cardHeight}}>
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
                }
            </div>
        )

    }
}
