import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export const AnimatedInput = ({ maxInputLength, required, inputName, placeholder, autoFocus }) => {
    const [ inputFocussed, setInputFocus ] = useState(false);

    const setInputFocusHandler = () => {
        setInputFocus(current => !current)
    }

    return (
        <div key={`input-${inputName}`} className="d-flex justify-content-center align-items-center flex-column">
                <input 
                    onFocus={setInputFocusHandler} 
                    onBlur={setInputFocusHandler}
                    className="title w-100 mt-3 border-none rounded-5" 
                    type="text" 
                    maxLength={maxInputLength} 
                    required={required} 
                    minLength="1" 
                    name={inputName} 
                    placeholder={placeholder}>
                </input>
                <div className="title-underline-wrapper">
                    <AnimatePresence >
                        <motion.div key="gray-line" className="title-underline"></motion.div>
                        {
                            inputFocussed && <motion.div key="orange-line" className="title-underline-themeColor title-underline"
                                initial={{ scaleX: 0.1 }}
                                animate={{ scaleX: 1 }}
                                exit={{ scaleX: 0.1 }}
                                transition={{ duration: .4 }}
                            />
                        }
                    </AnimatePresence>
                </div>
            </div>
                
    )
}