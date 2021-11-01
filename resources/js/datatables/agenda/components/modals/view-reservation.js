import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export const ViewReservationModal = ({}) => {
    return (
        <AnimatePresence >
            <motion.div 
                id="view-reservation-modal" 
                className="d-flex flex-column position-absolute justify-content-center align-items-center" 
                // initial={{ opacity: 0, top : marginTop - 20 + 'px', left: marginLeft - 20 + 'px', scale: 0 }}
                // animate={{ opacity: 1, top: marginTop + "px", left: marginLeft + "px", scale: 1 }}
                // exit={{ opacity: 0, top : marginTop - 20 + 'px', left: marginLeft - 20 + 'px', scale: 0.25}}
            >
            </motion.div>
        </AnimatePresence>
    )
}