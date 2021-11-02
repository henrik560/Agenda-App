import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";


export const ViewReservationModal = ({modalOpen, closeModal, saveModal, marginLeft, marginTop}) => {
    const [ editRows, setEditRowsStatus ] = useState(false)
    return (
        <AnimatePresence >
            { modalOpen && 
                <motion.div 
                    id="view-reservation-modal" 
                    // initial={{ opacity: 0, top : marginTop - 20 + 'px', left: marginLeft - 20 + 'px', scale: 0 }}
                    // animate={{ opacity: 1, top: marginTop + "px", left: marginLeft + "px", scale: 1 }}
                    // exit={{ opacity: 0, top : marginTop - 20 + 'px', left: marginLeft - 20 + 'px', scale: 0.25}}
                >   
                    <div className="d-flex justify-content-end align-items-end" onClick={() => {closeModal()}}>
                        <i className="fas fa-times"></i>
                    </div>
                    <div className="body-content">
                        <div className="body-content-container">
                            <div className={`content-row ${!editRows && 'content-row-border-bottom'}`}>
                                <div className="content-column">Begin - Eind Tijd</div>
                                { editRows == false ? <div className="content-column content-value">10:00 - 19:00</div> : <input className="content-column content-value content-input" placeholder="10:00 - 19:00"></input>} 
                            </div>
                            <div className={`content-row ${!editRows && 'content-row-border-bottom'}`}>
                                <div className="content-column">Titel</div>
                                { editRows == false ? <div className="content-column content-value">Catachasatie Avond</div> : <input className="content-column content-value content-input" placeholder="Catachasatie Avond"></input>} 
                            </div>
                            <div className={`content-row ${!editRows && 'content-row-border-bottom'}`}>
                                <div className="content-column">Beschrijving</div>
                                { editRows == false ? <div className="content-column content-value">Deze ruimte word verhuurd voor de catachasatie avond</div> : <textarea className="content-column content-value content-input" placeholder="Deze ruimte word verhuurd voor de catachasatie avond"></textarea>} 
                            </div>
                            <div className={`content-row ${!editRows && 'content-row-border-bottom'}`}>
                                <div className="content-column">Contact Persoon</div>
                                { editRows == false ? <div className="content-column content-value">Henrik Hannewijk</div> : <input className="content-column content-value content-input" placeholder="Henrik Hannewijk"></input>} 
                            </div>
                        </div>
                    </div>
                    <div className={`view-modal-footer ${editRows && 'margin-top'}`}>
                        { editRows == false ? <span onClick={() => {setEditRowsStatus(current => !current)}}>Bewerken</span> : <span onClick={() => {setEditRowsStatus(current => !current)}}>Opslaan</span>}
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}