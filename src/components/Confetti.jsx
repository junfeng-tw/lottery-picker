import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Confetti = () => {
    useEffect(() => {
        // Initial burst
        confetti({
            particleCount: 150,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ffd700', '#ff6347', '#1890ff', '#52c41a']
        });

        // Left cannon
        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 60,
                spread: 70,
                origin: { x: 0, y: 0.7 },
                colors: ['#ff0000', '#ffd700', '#ff6347']
            });
        }, 500);

        // Right cannon
        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 120,
                spread: 70,
                origin: { x: 1, y: 0.7 },
                colors: ['#1890ff', '#52c41a', '#ffd700']
            });
        }, 800);

        // Final burst
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 160,
                origin: { y: 0.5 },
                gravity: 0.8,
                colors: ['#ff0000', '#ffd700', '#ff6347', '#1890ff', '#52c41a']
            });
        }, 1200);
    }, []);

    return null;
};

export default Confetti;
