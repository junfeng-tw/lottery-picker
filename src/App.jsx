import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateBalls = (max, count) => {
    const balls = [];
    while (balls.length < count) {
        const num = Math.floor(Math.random() * max) + 1;
        if (!balls.includes(num)) balls.push(num);
    }
    return balls.sort((a, b) => a - b);
};

export default function LotteryPicker() {
    const [frontBalls, setFrontBalls] = useState([]);
    const [backBalls, setBackBalls] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDraw = () => {
        setIsDrawing(true);
        setFrontBalls([]);
        setBackBalls([]);

        const front = generateBalls(35, 5);
        const back = generateBalls(12, 2);

        front.forEach((num, idx) => {
            setTimeout(() => {
                setFrontBalls(prev => [...prev, num]);
            }, idx * 800);
        });

        back.forEach((num, idx) => {
            setTimeout(() => {
                setBackBalls(prev => [...prev, num]);
                if (idx === back.length - 1) setIsDrawing(false);
            }, (front.length + idx) * 800);
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-3xl mb-6 font-bold">大乐透随机选号器</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded shadow disabled:opacity-50"
                onClick={startDraw}
                disabled={isDrawing}
            >
                {isDrawing ? '抽取中...' : '开始抽取'}
            </button>

            <div className="mt-10">
                <AnimatePresence>
                    <div className="flex justify-center space-x-4 mb-4">
                        {frontBalls.map(num => (
                            <motion.div
                                key={`front-${num}`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="bg-red-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
                            >
                                {num}
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-center space-x-4">
                        {backBalls.map(num => (
                            <motion.div
                                key={`back-${num}`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="bg-blue-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
                            >
                                {num}
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}
