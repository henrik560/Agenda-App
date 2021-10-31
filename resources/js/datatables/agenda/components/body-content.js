import React from 'react';
import { Modal } from './modals/modal'
import { ContactPersonModal } from './modals/contact-person-modal';
import { InvoiceAdressModal } from './modals/invoice-address-modal';

export default class BodyContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseDown: false,
            elementCreated: false,
            newestElementID: '',
            creatingElement: false,
            modalSaved: false,
            createReservationPopupOpen: false,
            addContactPersonModalOpen: false,
            invoiceAddressModalOpen: false,
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

    removeChild() {
        const child = document.getElementById(`${this.state.newestElementID}-reservation`)
        if(child) {
            child.parentNode.removeChild(child)
        }
    }
    
    toggleModal(Modal) {
        if(Modal == "reservation") {
            this.setState(prev => ({createReservationPopupOpen: !prev.createReservationPopupOpen}))
        }else if(Modal == "person") {
            this.setState(prev => ({addContactPersonModalOpen: !prev.addContactPersonModalOpen}))
        }else if(Modal == "invoice") {
            this.setState(prev => ({invoiceAddressModalOpen: !prev.invoiceAddressModalOpen}))
        }  
    }

    openModal(Modal) {
        if(Modal == "reservation") {
            this.setState(prev => ({createReservationPopupOpen: true}))
        }else if(Modal == "person") {
            this.setState(prev => ({addContactPersonModalOpen: true, invoiceAddressModalOpen: true}))
        }else if(Modal == "invoice") {
            this.setState(prev => ({invoiceAddressModalOpen: true}))
        }  
    }

    closeModal(Modal) {
        if(Modal == "reservation") {
            this.removeChild()
            this.setState(prev => ({createReservationPopupOpen: false}))
        }else if(Modal == "person") {
            this.setState(prev => ({addContactPersonModalOpen: false}))
        }else if(Modal == "invoice") {
            this.setState(prev => ({invoiceAddressModalOpen: false}))
        }
    }

    saveModal(Modal) {
        if(Modal == "reservation") {
            this.setState(prev => ({createReservationPopupOpen: false, addContactPersonModalOpen: false, invoiceAddressModalOpen: false, modalSaved: true}))
            this.saveReservationToFrontEnd()
        }else if(Modal == "person") {
            this.setState(prev => ({addContactPersonModalOpen: false, invoiceAddressModalOpen: false, modalSaved: true}))
        }else if(Modal == "invoice") {
            this.setState(prev => ({invoiceAddressModalOpen: false, modalSaved: true}))
        }
    }

    saveReservationToFrontEnd() {
        var newestReservation = document.getElementById(`${this.state.newestElementID}-reservation`)
        if(newestReservation) {
            //Add Hover class 
            newestReservation.classList.add("reservation-card-hover")

            //Starting time
            var time = ((newestReservation.style.top.split("px")[0] / 36) + 8).toString().split(".")
            var hour = time[0]
            var minutes = time[1] ? (parseInt(time[1]) / 100) * 60 : '00'

            //Ending time
            var endTime = ((newestReservation.style.height.split("px")[0] / 36) + (newestReservation.style.top.split("px")[0] / 36) + 8).toString().split(".")
            var endHour = parseInt(endTime[0])
            var endMinutes = endTime[1] ? (parseInt(endTime[1]) / 100) * 60:'00'
  
            newestReservation.children[0].innerHTML = `${hour}:${minutes == 3 ? minutes + '0' : minutes}`
            newestReservation.children[1].innerHTML = `${endHour}:${endMinutes == 3 ? endMinutes + '0' : endMinutes}`
        }
    }

    reservationClickHandler(event) {    
        const reservation = document.getElementById(event.target.id)
        const timepopup = document.getElementById("time-popup")
        timepopup.innerHTML = reservation.getAttribute("data-starttime") + ' - ' + reservation.getAttribute("data-endtime")
    }

    mouseDownHandler(event) {
        (event.target.className == "reservation-card" || event.target.className == "grid-row") && this.setState({ mouseDown: true, newestElementID: '', createReservationPopupOpen: false });
        if(this.state.addContactPersonModalOpen == true) {
            this.setContactPersonModalState()
        }else {
            this.state.modalSaved == false && this.removeChild()
        }
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

        //Card Title
        var cardTitle = document.createElement("div")
        cardTitle.style.fontSize = '1vw'
        //Card Time
        var cardTime = document.createElement("div")
        cardTime.style.fontSize = '1vw'

        //Append Card Details to card
        newReservationElement.appendChild(cardTitle)
        newReservationElement.appendChild(cardTime)

        //Style card element
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
                                                                <div className="reservation-card reservation-card-hover d-flex flex-column justify-content-around align-items-center" id={Math.random().toString(16).slice(2)} data-starttime={`${start[0]}-${Math.round(start[1] / 15) * 15}`} data-endtime={`${end[0]}-${Math.round(end[1] / 15) * 15}`} key={space.width + resIndex} style={{top: cardMarginTop + 1, width: space.width, backgroundColor: building.backgroundColor, height: cardHeight}}>
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
                    // marginLeft={100} 
                    marginLeft={document.getElementById(`${this.state.newestElementID}-reservation`) ? document.getElementById(`${this.state.newestElementID}-reservation`).getBoundingClientRect().left : ''} 
                    // marginTop={100} 
                    marginTop={document.getElementById(`${this.state.newestElementID}-reservation`) ? document.getElementById(`${this.state.newestElementID}-reservation`).offsetTop : ''} 
                    // openModal={true}
                    modalOpen={this.state.createReservationPopupOpen}
                    saveModal={() => this.saveModal("reservation")} 
                    closeModal={() => this.closeModal("reservation")}
                    addContactPerson={() => this.openModal("person")}
                />
                <ContactPersonModal 
                    // openModal={true} 
                    marginTop={document.getElementById(`${this.state.newestElementID}-reservation`) ? document.getElementById(`${this.state.newestElementID}-reservation`).offsetTop : ''} 
                    // marginTop={50} 
                    marginLeft={document.getElementById(`${this.state.newestElementID}-reservation`) ? document.getElementById(`${this.state.newestElementID}-reservation`).getBoundingClientRect().left + 155: ''}
                    // marginLeft={400}
                    modalOpen={this.state.addContactPersonModalOpen} 
                    saveModal={() => this.saveModal("person")}
                    closePersonModal={() => this.closeModal("person")}
                    closeInvoiceAdressModal={() => this.closeModal("invoice")}
                    openInvoiceAdressModal={() => this.openModal("invoice")}
                    toggleInvoiceModal={() => this.toggleModal("invoice")}
                />
                <InvoiceAdressModal  
                    // openModal={true} 
                    marginTop={document.getElementById(`${this.state.newestElementID}-reservation`) ? document.getElementById(`${this.state.newestElementID}-reservation`).offsetTop : ''} 
                    // marginTop={50} 
                    marginLeft={document.getElementById(`${this.state.newestElementID}-reservation`) ? document.getElementById(`${this.state.newestElementID}-reservation`).getBoundingClientRect().left + 360: ''}
                    // marginLeft={600}
                    modalOpen={this.state.invoiceAddressModalOpen} 
                    saveModal={() => this.saveModal("invoice")}
                    closeInvoiceAdressModal={() => this.closeModal("invoice")}
                    
                />
            </div>
        )

    }
}
