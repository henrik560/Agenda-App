import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedInput } from './components/input-animated'

export const InvoiceAdressModal = ({ modalOpen, marginTop, marginLeft, saveModal, closeInvoiceAdressModal, inputOnChange }) => {
    return (
        <AnimatePresence >
        {modalOpen && (
            <motion.div 
                id="reservation-modal" 
                className="d-flex flex-column position-absolute justify-content-center align-items-center" 
                initial={{ opacity: 0, top : marginTop - 20 + 'px', left: marginLeft - 20 + 'px', scale: 0, }}
                animate={{ opacity: 1, top: marginTop + "px", left: marginLeft + "px", scale: 1, width: 200 }}
                exit={{ opacity: 0, top : marginTop - 20 + 'px', left: marginLeft - 20 + 'px', scale: 0.25 }}
                >

                    <div className="invoice-form reservation-form position-relative d-flex w-full rounded-5">
                        <div className="position-relative flex-column d-flex w-75">
                            <h5 className="mt-3 mb-n1">Factuurgegevens</h5>
                            <div className="d-flex flex-column w-100">
                                <AnimatedInput onInputChange={(value, input) => inputOnChange(value, input)} formName="reservation-form" key="adress" maxInputLength="120" required={true} inputName="ivAddress" placeholder="Adres"/>
                                <AnimatedInput onInputChange={(value, input) => inputOnChange(value, input)} formName="reservation-form" key="houseNumber" maxInputLength="120" required={true} inputName="ivHouseNumber" placeholder="Huisnummer"/>
                                <AnimatedInput onInputChange={(value, input) => inputOnChange(value, input)} formName="reservation-form" key="city" maxInputLength="120" required={true} inputName="ivCity" placeholder="Plaats"/>
                                <AnimatedInput onInputChange={(value, input) => inputOnChange(value, input)} formName="reservation-form" key="postalCode" maxInputLength="120" required={true} inputName="ivPostalCode" placeholder="Postcode"/>
                            </div>
                        </div>
                    </div>
            </motion.div>
        )}
        </AnimatePresence>
    )
}