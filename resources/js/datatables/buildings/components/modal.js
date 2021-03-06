import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

export const Modal = ({ openModal, setListAmount, current }) => {
    return (
        <AnimatePresence>
        {openModal && (
            <motion.div 
                id="modal" 
                className="modal-rows-visible d-flex flex-column position-absolute" 
                initial={{ opacity: 0, marginTop: -50, marginLeft: -50, scale: 0.75 }}
                animate={{ opacity: 1, marginTop: -113, marginLeft: 0, scale: 1 }}
                exit={{ opacity: 0, marginTop: -50, marginLeft: -50, scale: 0 }}>
            <motion.div id="modal-list" className="items d-flex flex-column justify-content-around align-items-center">
                    <motion.span className={parseInt(current) == 8 ? 'selected' : ''} onClick={setListAmount}>8</motion.span>
                    <motion.span className={parseInt(current) == 16 ? 'selected' : ''} onClick={setListAmount}>16</motion.span>
                    <motion.span className={parseInt(current) == 32 ? 'selected' : ''} onClick={setListAmount}>32</motion.span>
                    <motion.span className={parseInt(current) == 64 ? 'selected' : ''} onClick={setListAmount}>64</motion.span>
                </motion.div>
                <motion.div id="modal-arrow-down-icon"></motion.div>
            </motion.div>
        )}
        </AnimatePresence>
    )
}