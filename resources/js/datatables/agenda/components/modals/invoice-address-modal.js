import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedInput } from './components/input-animated'

export const InvoiceAdressModal = ({ openModal, marginTop, marginLeft, saveModal, closeInvoiceAdressModal }) => {
    return (
        <AnimatePresence >
        {openModal && (
            <motion.div 
                id="reservation-modal" 
                className="d-flex flex-column position-absolute justify-content-center align-items-center" 
                initial={{ opacity: 0, top : marginTop - 20 + 'px', left: marginLeft - 20 + 'px', scale: 0.75 }}
                animate={{ opacity: 1, top: marginTop + "px", left: marginLeft + "px", scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                >
                    <div className="close-icon" onClick={() => closeInvoiceAdressModal()}>
                        <i className="fas fa-times"></i>
                    </div>
                    <div className="invoice-form reservation-form position-relative d-flex justify-content-center align-items-center w-60 rounded-5">
                        <div className="position-relative flex-column d-flex justify-content-center align-items-center w-75">
                            <AnimatedInput key="adress" maxInputLength="120" required={true} inputName="invoice-address" placeholder="Adres"/>
                            <AnimatedInput key="houseNumber" maxInputLength="120" required={true} inputName="invoice-houseNumber" placeholder="Huisnummer"/>
                            <AnimatedInput key="city" maxInputLength="120" required={true} inputName="invoice-city" placeholder="Plaats"/>
                            <AnimatedInput key="postalCode" maxInputLength="120" required={true} inputName="invoice-postalCode" placeholder="Postcode"/>
                        </div>
                    </div>
            </motion.div>
        )}
        </AnimatePresence>
    )
}