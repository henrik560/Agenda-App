import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedInput } from './components/input-animated'

export const ContactPersonModal = ({ modalOpen, marginTop, marginLeft, saveModal, closePersonModal, toggleInvoiceModal, closeInvoiceAdressModal, openInvoiceAdressModal }) => {
    return (
        <AnimatePresence >
        {modalOpen && (
            <motion.div 
                id="reservation-modal" 
                className="add-contact-person-modal d-flex flex-column position-absolute justify-content-center align-items-center" 
                initial={{ opacity: 0, top : marginTop - 20 + 'px', left: marginLeft - 20 + 'px', scale: 0 }}
                animate={{ opacity: 1, top: marginTop + "px", left: marginLeft + "px", scale: 1 }}
                exit={{ opacity: 0, top : marginTop - 20 + 'px', left: marginLeft - 20 + 'px', scale: 0.25}}
                >
                    <div className="close-icon" onClick={() => closePersonModal()}>
                        <i className="fas fa-times"></i>
                    </div>
                    <div className="position-relative w-100 h-100 mt-3 rounded-5">
                        <div className="position-relative flex-column d-flex justify-content-center align-items-center w-60 h-90">
                            <div className="w-75">
                                <AnimatedInput key="name" maxInputLength="120" autoFocus="true" required={true} inputName="contactPerson-name" placeholder="Naam"/>
                                <AnimatedInput key="email" maxInputLength="120" autoFocus="false" required={true} inputName="contactPerson-email" placeholder="Email"/>
                                <AnimatedInput key="phone" maxInputLength="120" autoFocus="false" required={true} inputName="contactPerson-phone" placeholder="Telefoon"/>
                                <AnimatedInput key="iban" maxInputLength="120" autoFocus="false" required={true} inputName="contactPerson-iban" placeholder="Iban"/>
                            </div>
                            <div className="w-75">
                                <h5 className="mt-3 mb-n2">Adres</h5>
                                <AnimatedInput key="address" maxInputLength="120" autoFocus="false" required={true} inputName="contactPerson-address" placeholder="Adres"/>
                                <AnimatedInput key="housenumber" maxInputLength="120" autoFocus="false" required={true} inputName="contactPerson-housenumber" placeholder="Huisnummer"/>
                                <AnimatedInput key="city" maxInputLength="120" autoFocus="false" required={true} inputName="contactPerson-city" placeholder="Plaats"/>
                                <AnimatedInput key="postalCode" maxInputLength="120" autoFocus="false" required={true} inputName="contactPerson-postalCode" placeholder="Postcode"/>
                            </div>
                            <div className="invoice-wrapper">
                                <h5 className="mt-2">Factuuradres</h5>
                                <div className="d-flex justify-content-begin align-items-center flex-row mt-n2">
                                    <input onChange={(e) => { e.target.checked ? closeInvoiceAdressModal() : openInvoiceAdressModal() }} id="invoice-address-same" type="checkbox" className="invoice-adress-input"></input>
                                    <label id="invoice-address" style={{fontSize: '0.7rem'}} htmlFor="invoice-address-same" className="mt-2">Zelfde als adres</label>
                                </div>
                            </div>

                        </div>
                    </div>
            </motion.div>
        )}
        </AnimatePresence>
    )
}