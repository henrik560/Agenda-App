import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export const EditUserModal = ({ openModal, saveModalData, closeModal, modalData}) => {
    const [edit, setEdit] = useState(false);
    const [userRole, setUserRole ] = useState(() => { return 'Admin'})
    const [userName, setUserName ] = useState(() => { return 'Henrik Hannewijk'})
    const [editBuildings, setEditBuildingStatus ] = useState(false)
    const userRoleSelect = useRef()
    const userNameRef = useRef()

    function setEditHandler() {
        setEdit(prev => !prev)
    }

    function handleEditBuildings() {
        setEditBuildingStatus(prev => !prev)
    }

    function handleUserRoleSelector() {
        setUserRole(userRoleSelect.current.value)
    }
    
    function saveData() {
        setEditHandler()
        if(userNameRef.current.value == '') return
        setUserName(userNameRef.current.value)
    }

    function buttonOnClickHandler(id) {
        id == true ? saveData() : setEditHandler()
    }

    return (
        <AnimatePresence >
            {
                openModal && (
                    <motion.div 
                    id="edit-modal" 
                    className="position-absolute d-flex justify-content-center align-items-center w-100 h-100 top-0 start-0" 
                    style={{backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050}}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    >
                    <div className="position-relative w-25 h-auto bg-light rounded">
                        <div className="position-relative">
                            <div className="d-flex justify-content-end align-items-center">
                                <i onClick={() => closeModal("edit", false)} className="fas fa-times color-placeholder themeColor-hover close-icon-modal fs-20"></i>
                            </div>
                            <div className="d-flex flex-column w-100 mt-4 justify-content-center align-items-center gap-3">
                                <div className={`d-flex flex-row w-75 ${!edit&& 'underline-placeholder'}`}>
                                    <div className="d-flex w-100 justify-content-start align-items-center">
                                        <div className="color-placeholder fs-5 fw-500">Naam Gebruiker</div>
                                    </div>
                                    <div className="d-flex w-100 justify-content-start align-items-center">
                                        {
                                            edit ? <input className="edit-input" ref={userNameRef} placeholder={userName}></input> : <div className="d-flex fs-5">{userName}</div>
                                        }
                                    </div>
                                </div>
                                <div className={`d-flex flex-row w-75 ${!edit == true && 'underline-placeholder'}`}>
                                    <div className="d-flex w-100 justify-content-start align-items-center">
                                        <div className="color-placeholder fs-5 fw-500">Rol</div>
                                    </div>
                                    <div className="d-flex w-100 justify-content-start align-items-center">
                                        {
                                            edit ? 
                                                // <select className="edit-input" ref={hexInputRef} placeholder="Admin">
                                                //     { userRoles.map((role, index) => {
                                                //         return <option key={index}>{role}</option>
                                                //     })}
                                                // </select>
                                                <select className="edit-input" value={userRole} ref={userRoleSelect} onChange={handleUserRoleSelector} placeholder="Admin">
                                                        <option value="Admin" key="1">Admin</option>
                                                        <option value="Beheerder" key="2">Beheerder</option>
                                                        <option value="Externe gebruiker" key="3">Externe gebruiker</option>
                                                        <option value="Interne gebruiker" key="4">Interne gebruiker</option>
                                                </select>
                                                : 
                                                <div className="d-flex fs-5">{userRole}</div>
                                        }
                                    </div>
                                </div>
                                <div className={`d-flex flex-row w-75 ${!edit == true && 'underline-placeholder'}`}>
                                    <div className="d-flex w-100 justify-content-start align-items-center">
                                        <div className="color-placeholder fs-5 fw-500">Gebouwen</div>
                                    </div>
                                    <div className="d-flex w-100 justify-content-start align-items-center">
                                        {
                                            edit ? 
                                                <div className="edit-input w-100 position-relative">
                                                    <div className="current d-flex justify-content-between align-items-center" onClick={handleEditBuildings}>
                                                        <div>
                                                            <span>Klik om te openen</span>
                                                        </div>
                                                        <div>
                                                            <AnimatePresence>
                                                                {
                                                                editBuildings ? <i class="fas fa-sort-up pt-2"></i> : <i class="fas fa-sort-down"></i>   
                                                                }   

                                                            </AnimatePresence>
                                                        </div>
                                                    </div>
                                                    <AnimatePresence>
                                                    {
                                                            editBuildings && 
                                                        <motion.div 
                                                            className="listOfBuildings position-absolute w-100 start-0 d-flex flex-column mt-3 justify-content-between pl-1 bg-white rounded" 
                                                            style={{boxShadow: ' 0px 0px 15px 1px rgba(0, 0, 0, 0.51)', zIndex: '10', overflow: 'hidden'}}
                                                            initial={{height:0, opacity: 0}}
                                                            animate={{height: 'auto' ,opacity: 1}}
                                                            exit={{height:0, opacity:0}}
                                                            >
                                                                <div className="d-flex align-items-center">
                                                                <input id="cuneraKerk" type="checkbox" value="Cunera Kerk" placeholder="Cunera Kerk"></input>
                                                                <label className="pl-1" htmlFor="cuneraKerk">Cunera Kerk</label>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                <input id="cuneraKerk" type="checkbox" value="Cunera Kerk" placeholder="Cunera Kerk"></input>
                                                                <label className="pl-1" htmlFor="cuneraKerk">Cunera Kerk</label>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                <input id="cuneraKerk" type="checkbox" value="Cunera Kerk" placeholder="Cunera Kerk"></input>
                                                                <label className="pl-1" htmlFor="cuneraKerk">Cunera Kerk</label>
                                                                </div>
                                                        </motion.div>
                                                    }
                                                    </AnimatePresence>
                                                </div>
                                                : 
                                                <div className="d-flex fs-5">//TODO show list of buildings</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex position-relative justify-content-end w-100" style={{marginTop: edit ? '30px' : '40px'}}>
                            <div className="d-flex w-25 h-25 mb-3 border-themeColor-2 button-hover justify-content-center align-items-center" onClick={() => buttonOnClickHandler(edit)} style={{marginRight: '60px'}}>{edit == true ? 'Opslaan' : 'Bewerken'}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                )
            }
    
        </AnimatePresence>
    )
}