import React from 'react';
import { motion } from 'framer-motion';

const Ball = ({ number, color }) => {
    // Define lighter and darker shades for gradient effect
    const lighterColor = color === '#ff6347' ? '#ff8367' : '#ff6525';
    const darkerColor = color === '#ff6347' ? '#e54327' : '#d43500';

    return (
        <motion.div
            initial={{ scale: 0, rotate: -180, y: 50, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
            transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                mass: 1.2,
                duration: 0.8
            }}
            style={{
                background: `radial-gradient(circle at 30% 30%, ${lighterColor}, ${color} 60%, ${darkerColor})`,
                borderRadius: '50%',
                width: 50,
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
                border: '3px solid gold',
                margin: '5px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 -3px 6px rgba(0,0,0,0.2), inset 0 3px 6px rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Shine effect */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)',
                borderRadius: '50%'
            }} />
            {number}
        </motion.div>
    );
};

export default Ball;
