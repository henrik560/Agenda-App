import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';

export const DeleteBuildingModal = ({ openModal, closeModal, modalData, deleteSucces}) => {
    var csrf_token = '';

    useEffect(() => {
        csrf_token = document.getElementById("csrf_Token");
    }, []) 

    function handleCancelButton(box, status) {
        closeModal(box, status);
    }

    async function handleContinueButton() {
        var form = document.getElementById("deleteForm")
        try {
            await axios({
                method: 'DELETE',
                url: `/api/buildings/${modalData.id}`,
                data: new FormData(form),
                headers: {},
            }).then(function (response) {
                console.log(response)
            })
            deleteSucces()

        }catch(e) {
            console.log(e)
        }
        handleCancelButton('delete', false)
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
                        <form method="POST" id="deleteForm">
                            <input type="hidden" name="_method" value="DELETE"></input>
                            <input id="token" type="hidden" name="_token" value={csrf_token}></input>
                        </form>
                        <div className="position-relative">
                            <div className="d-flex justify-content-end align-items-center">
                                <i onClick={() => closeModal("delete", false)} className="fas fa-times color-placeholder themeColor-hover close-icon-modal fs-20"></i>
                            </div>
                            <div className="d-flex flex-column w-100 mt-4 justify-content-center align-items-center gap-3">
                                <div className="ml-5 mr-5 fs-5">Weet u zeker dat u de <b>{modalData.name}</b> wilt verwijderen?</div>
                            </div>
                            <div className="d-flex position-relative justify-content-center w-100" style={{marginTop: '40px'}}>
                                <div className="ml-5 w-100 mr-5 d-flex justify-content-around align-items-center gap-5 text-white">
                                    <div id="cancel" onClick={() => handleCancelButton('delete', false)} className="position-relative d-flex justify-content-center align-items-center bg-danger w-50 rounded p-2 danger-on-hover border border-5 border-danger">Annuleren</div>
                                    <div id="continue" onClick={() => handleContinueButton()} className="position-relative d-flex justify-content-center align-items-center bg-success w-50 rounded p-2 succes-on-hover border border-5 border-succes">Doorgaan</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                )
            }
    
        </AnimatePresence>
    )
}