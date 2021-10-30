import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedInput } from './components/input-animated'

export const Modal = ({ modalOpen, marginTop, marginLeft, saveModal, addContactPerson, closeModal }) => {
    const [ inputFocussedDesc, setDesFocus ] = useState(false);
    const [ inputFocussedPerson, setPersonFocus ] = useState(false);

    const setDesFocusHandler = () => {
        setDesFocus(current => !current)
    }

    const setPersonFocusHandler = () => {
        setPersonFocus(current => !current)
    }

    return (
        <AnimatePresence >
        {modalOpen && (
            <motion.div 
                id="reservation-modal" 
                className="d-flex flex-column position-absolute justify-content-center align-items-center" 
                initial={{ opacity: 0, top : marginTop - 20 + 'px', left: marginLeft - 20 + 'px', scale: 0 }}
                animate={{ opacity: 1, top: marginTop + "px", left: marginLeft + "px", scale: 1 }}
                exit={{ opacity: 0, top : marginTop - 20 + 'px', left: marginLeft - 20 + 'px', scale: 0.25}}
                >
                    <div className="close-icon" onClick={() => {closeModal()}}>
                        <i className="fas fa-times"></i>
                    </div>
                    <div className="reservation-form position-relative d-flex justify-content-center align-items-center w-60 rounded-5">
                        <div className="position-relative flex-column d-flex justify-content-center align-items-center w-75">
                            <AnimatedInput key="name" maxInputLength="120" required={true} inputName="contactPerson-name" placeholder="Titel"/>
                            <div key="input-description" className="d-flex justify-content-center align-items-center flex-column">
                                <textarea onFocus={setDesFocusHandler} onBlur={setDesFocusHandler} style={{resize:"none"}} className="title w-100 mt-3 border-none rounded-5" type="text" maxLength="450" required minLength="1" name="reservation-desc" placeholder="Beschrijving"></textarea>
                                <div className="title-underline-wrapper">
                                    <AnimatePresence >
                                        <motion.div key="gray-line" className="title-underline"></motion.div>
                                        {
                                            inputFocussedDesc && <motion.div key="orange-line" className="title-underline-themeColor title-underline"
                                                initial={{ scaleX: 0.1 }}
                                                animate={{ scaleX: 1 }}
                                                exit={{ scaleX: 0.1 }}
                                                transition={{ duration: .4 }}
                                            />
                                        }
                                    </AnimatePresence>
                                </div>
                            </div>
                            <div key="input-person" className="d-flex justify-content-center align-items-center flex-column">
                                <div className="d-flex justify-content-between align-items-center flex-row">
                                    <input onFocus={setPersonFocusHandler} onBlur={setPersonFocusHandler} style={{resize:"none"}} className="title w-100 mt-3 border-none rounded-5" type="text" maxLength="450" required minLength="1" name="reservation-person" placeholder="Persoon"></input>
                                    <i onClick={addContactPerson} className="fas fa-plus mt-3 w-25 d-flex justify-content-end align-items-center" style={{color: '#8e8e8e'}}></i>
                                </div>
                                <div className="title-underline-wrapper">
                                    <AnimatePresence >
                                        <motion.div key="gray-line" className="title-underline"></motion.div>
                                        {
                                            inputFocussedPerson && <motion.div key="orange-line" className="title-underline-themeColor title-underline"
                                                initial={{ scaleX: 0.1 }}
                                                animate={{ scaleX: 1 }}
                                                exit={{ scaleX: 0.1 }}
                                                transition={{ duration: .4 }}
                                            />
                                        }
                                    </AnimatePresence>
                                </div>
                            </div>
                            <div key="form-footer" style={{fontSize: '.8rem',}} className="form-footer d-flex justify-content-end align-items-center flex-row mt-5 w-75">
                                <div onClick={saveModal} key="save-reservation" id="saveReservation" className="">Opslaan</div>
                            </div>
                        </div>
                    </div>
             
                {/* <button onClick={saveModal}>Save</button> */}
            </motion.div>
        )}
        </AnimatePresence>
    )
}