import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Confetti = () => {
    useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 120,
            origin: { y: 0.6 },
        });
    }, []);

    return null;
};

export default Confetti;
