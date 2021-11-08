import React from 'react';
import { Modal } from './modals/modal'
import { ContactPersonModal } from './modals/contact-person-modal';
import { InvoiceAdressModal } from './modals/invoice-address-modal';
import { ViewReservationModal } from './modals/view-reservation';
import axios from 'axios';
import uuidv4 from 'uuid/v4'

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
            viewReservationModalOpen: false,
            listOfUsers: [],
            csrftoken: '',
            viewReservationData: '',
            modalMarginLeft: '',
            modalMarginTopClickedElement: '',
        }
        this.fetchUsers = this.fetchUsers.bind(this);
        this.handleFormSubmissionStatus = this.handleFormSubmissionStatus.bind(this);
        this.submitReservationToDB = this.submitReservationToDB.bind(this)
        this.deleteReservation = this.deleteReservation.bind(this)
        this.removeChild = this.removeChild.bind(this)
    }

    componentDidUpdate() {
        // console.log(this.props.currentDate)
    }

    componentDidMount() {
     
    }

    async componentDidMount() {  
        var token = document.getElementById("csrf_Token");
        this.setState({csrftoken: token.getAttribute("value")});
        try {
            await this.fetchUsers()  // it will wait here untill function a finishes
        } catch(err) {}
    }
    
    fetchUsers = async () => {
        try {
            await axios.get('api/users/').then((response) => {
                this.setState({listOfUsers: response.data})
            })
        }catch(e) {
            console.log(`Error fetching users: ${e}`)
        }
       
    }

    removeChild(child) {
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
        }else if(Modal == "viewReservation") {
            this.setState(prev => ({viewReservationModalOpen: !prev.viewReservationModalOpen}))
        }  
    }

    openModal(Modal) {
        if(Modal == "reservation") {
            this.setState(prev => ({createReservationPopupOpen: true}))
        }else if(Modal == "person") {
            this.setState(prev => ({addContactPersonModalOpen: true, invoiceAddressModalOpen: true}))
        }else if(Modal == "invoice") {
            this.setState(prev => ({invoiceAddressModalOpen: true}))
        } else if(Modal == "viewReservation") {
            this.setState(prev => ({viewReservationModalOpen: true,}))
        }
    }

    closeModal(Modal) {
        if(Modal == "reservation") {
            this.removeChild(document.getElementById(`${this.state.newestElementID}-reservation`))
            this.setState(prev => ({createReservationPopupOpen: false}))
        }else if(Modal == "person") {
            this.setState(prev => ({addContactPersonModalOpen: false}))
        }else if(Modal == "invoice") {
            this.setState(prev => ({invoiceAddressModalOpen: false}))
        }else if(Modal == "viewReservation") {
            this.setState(prev => ({viewReservationModalOpen: false}))
        }
    }

    saveModal(Modal) {
        if(Modal == "reservation") {
            this.saveReservationToFrontEnd()
            this.setState(prev => ({createReservationPopupOpen: false, addContactPersonModalOpen: false, invoiceAddressModalOpen: false, modalSaved: true}))
        }else if(Modal == "person") {
            this.setState(prev => ({addContactPersonModalOpen: false, invoiceAddressModalOpen: false, modalSaved: true}))
        }else if(Modal == "invoice") {
            this.setState(prev => ({invoiceAddressModalOpen: false, modalSaved: true}))
        }else if(Modal == "viewReservation") {
            this.setState(prev => ({viewReservationModalOpen: false, modalSaved: true}))
        }
    }

    saveReservationToFrontEnd() {
        var newestReservation = document.getElementById(`${this.state.newestElementID}-reservation`)
        var starttime = document.getElementById("form-starttime");
        var endtime = document.getElementById("form-endtime");
        var title = document.getElementById("resTitle");
        var person = document.getElementById("resCPerson");
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
            var startTimeString = `${hour}:${minutes == 3 ? minutes + '0' : minutes}`
            var endTimeString = `${endHour}:${endMinutes == 3 ? endMinutes + '0' : endMinutes}`
    
            starttime.setAttribute("value", startTimeString)
            endtime.setAttribute("value", endTimeString)
            newestReservation.children[0].innerHTML = title.value
            newestReservation.children[1].innerHTML = person.innerHTML
            newestReservation.setAttribute("data-starttime", startTimeString)
            newestReservation.setAttribute("data-endtime", endTimeString)

            this.submitReservationToDB()
            this.setState({newReservation: true})
        }
    }

    handleFormSubmissionStatus(status) {
        this.props.onReservationCreate(status)

    }

    submitReservationToDB= async () => {
        const form = document.getElementById("reservation-form")
        var reservation = document.getElementById(`${this.state.newestElementID}-reservation`)
        var postStatus = true
        if(form) {
            try {
                await axios({
                    method: 'POST',
                    url: '/api/reservations/',
                    data: new FormData(form),
                    headers: { "Content-Type": "multipart/form-data" },
                }).then(function (response) {
                    postStatus = true
                    if(reservation) reservation.setAttribute("data-reservationid", response.data.lastID)
                  }).catch(function (response) {
                    postStatus = false
                  });
            }catch(e) {
            }
        }
        if(postStatus) {
            await this.handleFormSubmissionStatus("succes")
        }else {
            await this.handleFormSubmissionStatus("error")
            await this.removeChild(document.getElementById(`${this.state.newestElementID}-reservation`))
        }
    }

    async fetchReservationData(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/api/reservations/${id}`)
                .then(res => {
                    resolve(res.data.reservation[0])
                })
                .catch(err => reject(err))
        })
    }

    async cardOnClickHandler(event) {   
        if(this.state.createReservationPopupOpen == true) this.closeModal("reservation") 
        const reservation = document.getElementById(event.target.id)
        var viewReservationData = await this.fetchReservationData(reservation.getAttribute("data-reservationid"))
        viewReservationData["reservationElementID"] = reservation.id
        if(viewReservationData == "error") return handleFormSubmissionStatus("error");
        const reservationParent = reservation.parentNode
        var agendaGrid = reservation.parentNode.parentNode.cloneNode(true)
        var marginLeft = 100
        var continueLoop = true
        for (const child of agendaGrid.children) {
            if(child.style.width != '' || child.style.width.length > 0) {
                if(continueLoop)  {
                    if(marginLeft >= 1000)  {
                        marginLeft = marginLeft - 445
                    }else {
                        marginLeft = parseInt(marginLeft) + Math.round(parseInt(child.style.width.split("px")[0])) + 4.5
                    }
                }
                if(child.id == reservationParent.id) continueLoop = false
            }
      
        }
        // const timepopup = document.getElementById("view-reservation-modal")
        this.setState({modalMarginLeft: marginLeft, modalMarginTopClickedElement: event.target.style.top, viewReservationData})
        this.openModal("viewReservation")
        // timepopup.innerHTML = reservation.getAttribute("data-starttime") + ' - ' + reservation.getAttribute("data-endtime")
    }

    mouseDownHandler(event) {
        (event.target.className == "reservation-card" || event.target.className == "grid-row") && this.setState({ mouseDown: true, newestElementID: '', createReservationPopupOpen: false, addContactPersonModalOpen: false, invoiceAddressModalOpen: false, });
        this.state.modalSaved == false && this.removeChild(document.getElementById(`${this.state.newestElementID}-reservation`))
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

    deleteReservation(reservationID, elementID) {
        var form = document.getElementById("deleteReservationForm")
        this.closeModal("viewReservation")
        new Promise((resolve, reject) => {
            axios({
                method: 'DELETE',
                url: `/api/reservations/${reservationID}`,
                data: new FormData(form),
                headers: {}
            }).then((res) => {
                location.reload(true)
            }).catch(err => succes = false)
        })
    }

    createElement(element) {
        if(this.state.viewReservationModalOpen == true) this.closeModal("viewReservation") 
        if(!element.target.id.startsWith("row") || element.target.className == "reservation-card") return
        var parentElement = document.querySelector(`[data-spaceid='${element.target.id.split("-")[3]}']`)
        var newReservationElement = document.createElement("div")
        var marginTop = (Math.round(element.nativeEvent.offsetY / 9) * 9)
        var randomID = uuidv4()
        if(!parentElement) return 
        //Set spaceID in form for form submission
        var spaceIDInput = document.getElementById("resSpaceID")
        if(spaceIDInput) spaceIDInput.setAttribute('value', element.target.id.split("-")[3])

        //Card Title
        var cardTitle = document.createElement("div")
        var cardTime = document.createElement("div")
        
        //Stlye cards 
        cardTitle.classList.add("res-details")
        cardTime.classList.add("res-details")
        cardTime.style.width = (parentElement.getBoundingClientRect().width - 20) + "px"
        cardTitle.style.width = (parentElement.getBoundingClientRect().width - 20) + "px"
        //Append Card Details to card
        newReservationElement.appendChild(cardTitle)
        newReservationElement.appendChild(cardTime)

        //Style card element
        newReservationElement.style.backgroundColor = parentElement.style.backgroundColor;
        newReservationElement.style.height = "9px"
        newReservationElement.style.top = marginTop + "px"
        newReservationElement.style.width = parentElement.getBoundingClientRect().width + "px"
        // newReservationElement.onclick = async function(e) { await cardOnClickHandler(e) };
        newReservationElement.classList.add("reservation-card")
        newReservationElement.id = `${randomID}-reservation`
        this.setState({newestElementID: `${randomID}`, elementCreated: true})
        var appendElement = document.getElementById(element.target.id)
        appendElement.appendChild(newReservationElement)
    }

    setFormInputValue(value, input) {
        var formInput = document.getElementById(input);
        if(formInput) {
            formInput.setAttribute('value', value)
        }
    }

    render() {
        return(
            <div className="time-grid-item-wrapper">
                <form id="deleteReservationForm" method="post">
                    <input type="hidden" name="_method" value="DELETE"></input>
                    <input id="token" type="hidden" name="_token" value={this.state.csrftoken}></input>
                </form>
                <form id="reservation-form" method="post" action="/api/reservations" className="time-grid-item gap-1 d-flex justify-content-between">
                    <div id="reservation-form-wrapper-deletable">
                    <input id="form-starttime" type="hidden" name="starttime"></input>
                    <input id="form-endtime" type="hidden" name="endtime"></input>
                    <input id="token" type="hidden" name="_token" value={this.state.csrftoken}></input>
                    <input type="hidden" id="resDate" name="resDate" value={this.props.currentDate}></input>
                    <input type="hidden" id="resSpaceID" name="resSpaceID"></input>
                    <input type="hidden" id="cName" name="cName"></input>
                    <input type="hidden" id="cEmail" name="cEmail"></input>
                    <input type="hidden" id="cPhone" name="cPhone"></input>
                    <input type="hidden" id="cIban" name="cIban"></input>
                    <input type="hidden" id="cAddress" name="cAddress"></input>
                    <input type="hidden" id="cCity" name="cCity"></input>
                    <input type="hidden" id="cHouseNumber" name="cHouseNumber"></input>
                    <input type="hidden" id="cPostalCode" name="cPostalCode"></input>
                    <input type="hidden" id="ivAddress" name="ivAddress"></input>
                    <input type="hidden" id="ivCity" name="ivCity"></input>
                    <input type="hidden" id="ivHouseNumber" name="ivHouseNumber"></input>
                    <input type="hidden" id="ivPostalCode" name="ivPostalCode"></input>
                    <input type="hidden" id="ivAddressSame" name="ivAddressSame"></input>
                    </div>
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
                                                        if(reservation.date == this.props.currentDate && reservation.starttime < reservation.endtime) {
                                                            var start = reservation.starttime.split(":")
                                                            var end = reservation.endtime.split(":")
                                                            var cardMarginTop = ((start[0] -8) * 36) + (Math.round(start[1] / 15) * 9)
                                                            var cardHeight = ((((end[0] - start[0]) * 4) + ((Math.round(end[1]) - Math.round(start[1])) / 15)) * 9) - 1
                                                            if(cardHeight < 577) {
                                                                if(cardHeight < 50) {
                                                                    return ( 
                                                                        <div className="reservation-card reservation-card-hover" onClick={async (e) => await this.cardOnClickHandler(e)} id={uuidv4()} data-reservationid={reservation.id} data-starttime={`${start[0]}-${Math.round(start[1] / 15) * 15}`} data-endtime={`${end[0]}-${Math.round(end[1] / 15) * 15}`} key={space.width + resIndex} style={{top: cardMarginTop + 1, width: space.width, backgroundColor: building.backgroundColor, height: cardHeight}}>
                                                                        </div>
                                                                    )
                                                                }
                                                                return ( 
                                                                    <div className="reservation-card reservation-card-hover" onClick={async (e) => await this.cardOnClickHandler(e)} id={uuidv4()} data-reservationid={reservation.id} data-starttime={`${start[0]}-${Math.round(start[1] / 15) * 15}`} data-endtime={`${end[0]}-${Math.round(end[1] / 15) * 15}`} key={space.width + resIndex} style={{top: cardMarginTop + 1, width: space.width, backgroundColor: building.backgroundColor, height: cardHeight}}>
                                                                        <div className="res-details" style={{width: space.width - 20}}><b>{reservation.title}</b></div>
                                                                        <span className="res-details" style={{width: space.width - 20}}>{reservation.reservation_has_user.name}</span>
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
                        listOfUsers={this.state.listOfUsers}
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
                        inputOnChange={(value, input) => {this.setFormInputValue(value, input)}}
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
                        inputOnChange={(value, input) => {this.setFormInputValue(value, input)}}
                    />
                    <ViewReservationModal 
                        // openModal={true} 
                        marginTop={this.state.modalMarginTopClickedElement} 
                        // marginTop={50} 
                        // marginLeft={document.getElementById(`${this.state.newestElementID}-reservation`) ? document.getElementById(`${this.state.newestElementID}-reservation`).getBoundingClientRect().left + 360: ''}
                        marginLeft={this.state.modalMarginLeft}
                        // marginLeft={600}
                        // modalOpen={true}
                        modalOpen={this.state.viewReservationModalOpen}
                        saveModal={() => this.saveModal("viewReservation")}
                        closeModal={() => this.closeModal("viewReservation")}
                        reservation={this.state.viewReservationData}
                        listOfUsers={this.state.listOfUsers}
                        deleteReservation={(reservationID, elementID) => {this.deleteReservation(reservationID, elementID)}}
                    />
                </form>
            </div>
        )

    }
}
