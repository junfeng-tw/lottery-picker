import React, { useState } from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import Ball from './Ball';
import Confetti from './Confetti';

const pickNumbers = (count, max) => {
    const set = new Set();
    while (set.size < count) {
        set.add(Math.floor(Math.random() * max) + 1);
    }
    return [...set];
};

const LotteryMachine = ({ onFinish }) => {
    const [frontBalls, setFrontBalls] = useState([]);
    const [backBalls, setBackBalls] = useState([]);
    const [rolling, setRolling] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const startLottery = async () => {
        setRolling(true);
        setFrontBalls([]);
        setBackBalls([]);
        setShowConfetti(false);

        const front = pickNumbers(5, 35);
        const back = pickNumbers(2, 12);

        for (let num of front) {
            await new Promise((res) => setTimeout(res, 700));
            setFrontBalls((b) => [...b, num]);
        }

        for (let num of back) {
            await new Promise((res) => setTimeout(res, 700));
            setBackBalls((b) => [...b, num]);
        }

        setShowConfetti(true);
        setRolling(false);
        onFinish({ front, back, date: new Date() });
    };

    return (
        <>
            <motion.div
                animate={rolling ? { rotate: [0, 2, -2, 0] } : {}}
                transition={{ repeat: rolling ? Infinity : 0, duration: 0.3 }}
                style={{ padding: 20, border: '4px solid gold', borderRadius: 15, background: '#d40000' }}
            >
                <Button type="primary" size="large" onClick={startLottery} disabled={rolling}>
                    {rolling ? '摇奖中...' : '🎰 开始摇奖'}
                </Button>

                <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <h3 style={{ color: 'white' }}>前区</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {frontBalls.map((num, i) => (
                            <Ball key={i} number={num} color="#ff6347" />
                        ))}
                    </div>

                    <h3 style={{ color: 'white' }}>后区</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {backBalls.map((num, i) => (
                            <Ball key={i} number={num} color="#ff4500" />
                        ))}
                    </div>
                </div>
            </motion.div>

            {showConfetti && <Confetti />}
        </>
    );
};

export default LotteryMachine;
