import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedInput } from './components/input-animated';
import axios from 'axios';

export const Modal = ({ modalOpen, marginTop, marginLeft, saveModal, addContactPerson, closeModal, listOfUsers }) => {
    const [ inputFocussedDesc, setDesFocus ] = useState(false);

    const [ inputFocussedPerson, setPersonFocus ] = useState(false);
    
    const [ userListOpen, setUserListOpen ] = useState(false);
    const [ selectedUser, setSelectedUser ] = useState("Persoon");
    const [ selectedUserChanged, setUserChanged ] = useState(false);
    const [ addUserModalOpen, setAddUserModalState] = useState(false)

    const setDesFocusHandler = () => {
        setDesFocus(current => !current)
    }

    const setPersonFocusHandler = () => {
        setPersonFocus(current => !current)
    }

    const setUserListState = () => {
        setUserListOpen(current => !current)
    }

    const setSelectedUserHandler = (user) => {
        setSelectedUser(user)
        var input = document.getElementById("reservation-person-input");
        if(input) {
            input.setAttribute('value', user)
        }
        setUserChanged(true)
        setUserListState()
    }

    const toggleAddPersonModal = () => {
        addContactPerson()
        setAddUserModalState(current => !current)
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
                            <AnimatedInput onInputChange={() => {}} formName="reservation-form" key="name" maxInputLength="120" required={true} inputName="resTitle" placeholder="Titel"/>
                            <div key="input-description" className="d-flex justify-content-center align-items-center flex-column">
                                <textarea onFocus={setDesFocusHandler} onBlur={setDesFocusHandler} style={{resize:"none"}} className="title w-100 mt-3 border-none rounded-5" type="text" maxLength="450" required minLength="1" name="resDesc" id="resDesc" placeholder="Beschrijving"></textarea>
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
                                    <input 
                                        form="reservation-form"
                                        onFocus={setPersonFocusHandler} 
                                        onBlur={setPersonFocusHandler} 
                                        style={{resize:"none"}} 
                                        className="title w-100 mt-3 border-none rounded-5" 
                                        type="text" 
                                        maxLength="450" 
                                        required minLength="1" 
                                        name="resCPerson" 
                                        id="resCPerson"
                                        placeholder="Persoon" 
                                        disabled={addUserModalOpen}
                                        ></input>
                                    <i onClick={setUserListState} className="fas fa-sort-down" style={{color: '#8e8e8e'}}></i>
                                    <i onClick={toggleAddPersonModal} className="fas fa-plus mt-3 w-25 d-flex justify-content-end align-items-center" style={{color: '#8e8e8e'}}></i>
                                </div>
                                <div className="title-underline-wrapper">
                                    <AnimatePresence >
                                        <motion.div key="gray-line" className={`title-person-underline title-underline ${selectedUserChanged == true && 'title-underline-green'}`}></motion.div>
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
                                {/* <button onClick={(e) => {saveModal, e.preventDefault()}} form="reservation-form" type="submit" key="save-reservation" id="saveReservation" className="">Opslaan</button> */}
                                <div onClick={(e) => {saveModal()}} key="save-reservation" id="saveReservation" className="">Opslaan</div>
                            </div>
                            <AnimatePresence >
                                    {
                                            userListOpen && 
                                            <motion.div 
                                                key="usersList" 
                                                className="usersList"
                                                initial={{height: 0, opacity: 0}}
                                                animate={{height: "auto", opacity: 1}}
                                                exit={{height:0, opacity: 0}}
                                            >

                                                {
                                                  listOfUsers.map((user, index) => {
                                                      return ( 
                                                          <div onClick={() => setSelectedUserHandler(user)} className="user-item" key={user.name}>{user.name}</div>
                                                      )
                                                  })  
                                                }

                                            </motion.div>
                                    }
                                    </AnimatePresence>
                        </div>
                    </div>
             
            </motion.div>
        )}
        </AnimatePresence>
    )
}