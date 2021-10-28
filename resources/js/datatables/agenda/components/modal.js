import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

export const Modal = ({ openModal, marginTop, marginLeft, saveModal }) => {
    return (
        <AnimatePresence>
        {openModal && (
            <motion.div 
                id="reservation-modal" 
                className="d-flex flex-column position-absolute" 
                initial={{ opacity: 0, marginTop : marginTop - 20 + 'px', marginLeft: marginLeft - 20 + 'px', scale: 0.75 }}
                animate={{ opacity: 1, marginTop: marginTop + "px", marginLeft: marginLeft + "px", scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}>
                <button onClick={saveModal}>Save</button>
            </motion.div>
        )}
        </AnimatePresence>
    )
}