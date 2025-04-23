import React from 'react';
import { motion } from 'framer-motion';

const Ball = ({ number, color }) => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{
            backgroundColor: color,
            borderRadius: '50%',
            width: 50,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontSize: 18,
            border: '3px solid gold',
            margin: '5px',
        }}
    >
        {number}
    </motion.div>
);

export default Ball;
