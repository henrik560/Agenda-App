import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export const EditBuildingModal = ({ openModal, saveModalData, closeModal, modalData}) => {
    const [edit, setEdit] = useState(false);
    const hexInputRef = useRef()

    function setEditHandler() {
        setEdit(prev => !prev)
    }

    function saveData() {
        //Do something
    }

    function buttonOnClickHandler(id) {
        id == true ? saveData() : setEditHandler()
    }

    function handleHexColorChange() {
        if(hexInputRef.current.value == '') hexInputRef.current.value = '#'
        document.getElementById("hexColorDisplayer").style.backgroundColor = hexInputRef.current.value
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
                    <div className="position-relative w-25 h-25 bg-light rounded">
                        <div className="position-relative">
                            <div className="d-flex justify-content-end align-items-center">
                                <i onClick={() => closeModal("edit", false)} className="fas fa-times color-placeholder themeColor-hover close-icon-modal fs-20"></i>
                            </div>
                            <div className="d-flex flex-column w-100 mt-4 justify-content-center align-items-center gap-3">
                                <div className={`d-flex flex-row w-75 ${!edit&& 'underline-placeholder'}`}>
                                    <div className="d-flex w-100 justify-content-start align-items-center">
                                        <div className="color-placeholder fs-5 fw-500">Naam Gebouw</div>
                                    </div>
                                    <div className="d-flex w-100 justify-content-start align-items-center">
                                        {
                                            edit ? <input className="edit-input" placeholder={modalData.name}></input> : <div className="d-flex fs-5">{modalData.name}</div>
                                        }
                                    </div>
                                </div>
                                <div className={`d-flex flex-row w-75 ${!edit == true && 'underline-placeholder'}`}>
                                    <div className="d-flex w-100 justify-content-start align-items-center">
                                        <div className="color-placeholder fs-5 fw-500">Hex Kleur</div>
                                    </div>
                                    <div className="d-flex w-100 justify-content-start align-items-center">
                                        {
                                            edit ? <input className="edit-input" ref={hexInputRef} onFocus={() => handleHexColorChange()} onChange={() => { handleHexColorChange()}} placeholder={`#${modalData.hex}`}></input> : <div className="d-flex fs-5">{`#${modalData.hex}`}</div>
                                        }
                                        <div className="ml-2" id="hexColorDisplayer" style={{backgroundColor: `#${modalData.hex}`, width: 15, height: 15}}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex position-relative justify-content-end w-100" style={{marginTop: edit ? '30px' : '40px'}}>
                            <div className="d-flex w-25 h-25 border-themeColor-2 button-hover justify-content-center align-items-center" id={edit.toString()} onClick={(e) => buttonOnClickHandler(e.target.id)} style={{marginRight: '60px'}}>{edit == true ? 'Opslaan' : 'Bewerken'}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                )
            }
    
        </AnimatePresence>
    )
}