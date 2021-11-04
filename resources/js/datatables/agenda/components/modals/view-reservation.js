import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';


export const ViewReservationModal = ({modalOpen, closeModal, reservation, marginLeft, marginTop, deleteReservation}) => {
    const [ userRole, setUserRole ] = useState() 
    const [ editRows, setEditRowsStatus ] = useState(false)

    useEffect(async() => {
        var userID = document.getElementById("userID")
        if(!userID) return
        await axios.get(`api/users/${userID.value}`).then(response => {
            setUserRole(response.data.user[0].role)
        })
    }, [])

    function handleDeleteReservationClick(reservationID, reservationElementID) {
        deleteReservation(reservationID, reservationElementID)
    }

    return (
        <AnimatePresence >
            { modalOpen && 
                <motion.div 
                    id="view-reservation-modal" 
                    initial={{ opacity: 0, top : 100, left: 100 + 'px', scale: 0 }}
                    animate={{ opacity: 1, top: marginTop + "px", left: marginLeft + "px", scale: 1 }}
                    exit={{ opacity: 0, top : 100, left: 100, scale: 0.25}}
                >   
                    <div className="d-flex justify-content-end align-items-end" onClick={() => {closeModal()}}>
                        <i className="fas fa-times"></i>
                    </div>
                    <div className="body-content">
                        <div className="body-content-container">
                            <div className={`content-row ${!editRows && 'content-row-border-bottom'}`}>
                                <div className="content-column">Begin - Eind Tijd</div>
                                { editRows == false ? <div className="content-column content-value">{`${reservation.starttime.split(":")[0]}:${reservation.starttime.split(":")[1]} - ${reservation.endtime.split(":")[0]}:${reservation.endtime.split(":")[1]}`}</div> : <input className="content-column content-value content-input" placeholder={`${reservation.starttime.split(":")[0]}:${reservation.starttime.split(":")[1]} - ${reservation.endtime.split(":")[0]}:${reservation.endtime.split(":")[1]}`}></input>} 
                            </div>
                            <div className={`content-row ${!editRows && 'content-row-border-bottom'}`}>
                                <div className="content-column">Titel</div>
                                { editRows == false ? <div className="content-column content-value">{`${reservation.title}`}</div> : <input className="content-column content-value content-input" placeholder={`${reservation.title}`}></input>} 
                            </div>
                            <div className={`content-row ${!editRows && 'content-row-border-bottom'}`}>
                                <div className="content-column">Beschrijving</div>
                                { editRows == false ? <div className="content-column content-value">{`${reservation.description}`}</div> : <textarea className="content-column content-value content-input" placeholder={`${reservation.description}`} style={{resize: 'none'}}></textarea>} 
                            </div>
                            <div className={`content-row ${!editRows && 'content-row-border-bottom'}`}>
                                <div className="content-column">Contact Persoon</div>
                                { editRows == false ? <div className="content-column content-value">{`${reservation.reservation_has_user.name}`}</div> : <input className="content-column content-value content-input" placeholder={`${reservation.reservation_has_user.name}`}></input>} 
                            </div>
                        </div>
                    </div>
                    <div className={`d-flex w-100 justify-content-center align-items-center ${editRows && 'margin-top'}`} style={{marginTop: '30px'}}>
                        <div className="d-flex w-75 gap-5 justify-content-between align-items-center text-white">
                            <div className="p-2 w-50 rounded d-flex justify-content-center align-items-center bg-danger danger-on-hover">
                                <span onClick={() => {handleDeleteReservationClick(reservation.id, reservation.reservationElementID)}}>Verwijderen</span>
                            </div>
                            <div className="p-2 w-50 rounded d-flex justify-content-center align-items-center bg-themeColor themeColor-on-hover">
                            { editRows == false ? <span onClick={() => {setEditRowsStatus(current => !current)}}>Bewerken</span> : <span onClick={() => {setEditRowsStatus(current => !current)}}>Opslaan</span>}
                            </div>
                        </div>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}