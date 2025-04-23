import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [machineActive, setMachineActive] = useState(false);
    const [progress, setProgress] = useState(0);

    // Reset progress when rolling stops
    useEffect(() => {
        if (!rolling) {
            setProgress(0);
        }
    }, [rolling]);

    const startLottery = async () => {
        setRolling(true);
        setFrontBalls([]);
        setBackBalls([]);
        setShowConfetti(false);
        setProgress(0);

        // Start the machine animation
        setMachineActive(true);

        // Generate numbers but don't show them yet
        const front = pickNumbers(5, 35);
        const back = pickNumbers(2, 12);
        const totalBalls = front.length + back.length;
        let drawnCount = 0;

        // Simulate the machine running for a bit before balls start coming out
        await new Promise((res) => setTimeout(res, 1500));

        // Front balls with rolling animation
        for (let i = 0; i < front.length; i++) {
            await new Promise((res) => setTimeout(res, 800));
            setFrontBalls((b) => [...b, front[i]]);
            drawnCount++;
            setProgress((drawnCount / totalBalls) * 100);
        }

        // Back balls with rolling animation
        for (let i = 0; i < back.length; i++) {
            await new Promise((res) => setTimeout(res, 800));
            setBackBalls((b) => [...b, back[i]]);
            drawnCount++;
            setProgress((drawnCount / totalBalls) * 100);
        }

        // Finish the animation
        await new Promise((res) => setTimeout(res, 500));
        setMachineActive(false);
        setShowConfetti(true);
        setRolling(false);
        onFinish({ front, back, date: new Date() });
    };

    // Machine animation variants
    const machineVariants = {
        idle: { scale: 1 },
        active: {
            scale: [1, 1.02, 0.98, 1],
            rotate: [0, 1, -1, 0],
            transition: {
                scale: { repeat: Infinity, duration: 0.5 },
                rotate: { repeat: Infinity, duration: 0.3 }
            }
        }
    };

    // Ball container animation variants
    const containerVariants = {
        idle: { y: 0 },
        active: {
            y: [0, -5, 5, 0],
            transition: { repeat: Infinity, duration: 0.5 }
        }
    };

    return (
        <>
            <motion.div
                variants={machineVariants}
                animate={machineActive ? 'active' : 'idle'}
                style={{
                    padding: 20,
                    background: 'linear-gradient(to bottom, #e50000, #b30000)',
                    borderRadius: 15,
                    border: '6px solid gold',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.3), inset 0 0 15px rgba(0,0,0,0.2)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative elements for the lottery machine */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '10px',
                    background: 'linear-gradient(to right, gold, #ffdd55, gold)',
                    borderRadius: '5px 5px 0 0'
                }} />

                {/* Machine title */}
                <div style={{ textAlign: 'center', marginBottom: 15 }}>
                    <h2 style={{ color: 'gold', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>🎰 大乐透摇奖机 🎰</h2>
                </div>

                {/* Control button */}
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <Button
                        type="primary"
                        size="large"
                        onClick={startLottery}
                        disabled={rolling}
                        style={{
                            background: rolling ? '#faad14' : '#1890ff',
                            borderColor: rolling ? '#d48806' : '#096dd9',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        }}
                    >
                        {rolling ? '摇奖中...' : '🎮 开始摇奖'}
                    </Button>
                </div>

                {/* Progress bar */}
                {rolling && (
                    <div style={{ marginBottom: 15, padding: '0 10px' }}>
                        <div style={{ height: 8, background: 'rgba(0,0,0,0.2)', borderRadius: 4, overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                style={{ height: '100%', background: 'gold', borderRadius: 4 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>
                )}

                {/* Ball display area */}
                <div style={{
                    marginTop: 10,
                    textAlign: 'center',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 10,
                    padding: 15,
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'
                }}>
                    {/* Front balls section */}
                    <div style={{ marginBottom: 15 }}>
                        <h3 style={{ color: 'white', margin: 0, marginBottom: 10, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>前区号码</h3>

                        {/* Animated balls container */}
                        <motion.div
                            variants={containerVariants}
                            animate={machineActive && frontBalls.length < 5 ? 'active' : 'idle'}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                minHeight: 60,
                                position: 'relative'
                            }}
                        >
                            {/* Dummy balls animation when machine is active */}
                            {machineActive && frontBalls.length < 5 && (
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', overflow: 'hidden' }}>
                                    {Array.from({ length: 10 }).map((_, i) => (
                                        <motion.div
                                            key={`dummy-front-${i}`}
                                            animate={{
                                                x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                                                y: [Math.random() * 50 - 25, Math.random() * 50 - 25],
                                                opacity: [0.3, 0.6, 0.3],
                                                scale: [0.5, 0.7, 0.5]
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 0.8 + Math.random() * 0.4,
                                                repeatType: 'reverse'
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: `${Math.random() * 100}%`,
                                                left: `${Math.random() * 100}%`,
                                                width: 30,
                                                height: 30,
                                                borderRadius: '50%',
                                                background: '#ff6347',
                                                opacity: 0.3,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: 12
                                            }}
                                        >
                                            {Math.floor(Math.random() * 35) + 1}
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Actual balls */}
                            <AnimatePresence>
                                {frontBalls.map((num, i) => (
                                    <Ball key={`front-${num}`} number={num} color="#ff6347" />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Back balls section */}
                    <div>
                        <h3 style={{ color: 'white', margin: 0, marginBottom: 10, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>后区号码</h3>

                        {/* Animated balls container */}
                        <motion.div
                            variants={containerVariants}
                            animate={machineActive && frontBalls.length === 5 && backBalls.length < 2 ? 'active' : 'idle'}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                minHeight: 60,
                                position: 'relative'
                            }}
                        >
                            {/* Dummy balls animation when machine is active */}
                            {machineActive && frontBalls.length === 5 && backBalls.length < 2 && (
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', overflow: 'hidden' }}>
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <motion.div
                                            key={`dummy-back-${i}`}
                                            animate={{
                                                x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                                                y: [Math.random() * 50 - 25, Math.random() * 50 - 25],
                                                opacity: [0.3, 0.6, 0.3],
                                                scale: [0.5, 0.7, 0.5]
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 0.8 + Math.random() * 0.4,
                                                repeatType: 'reverse'
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: `${Math.random() * 100}%`,
                                                left: `${Math.random() * 100}%`,
                                                width: 30,
                                                height: 30,
                                                borderRadius: '50%',
                                                background: '#ff4500',
                                                opacity: 0.3,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: 12
                                            }}
                                        >
                                            {Math.floor(Math.random() * 12) + 1}
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Actual balls */}
                            <AnimatePresence>
                                {backBalls.map((num, i) => (
                                    <Ball key={`back-${num}`} number={num} color="#ff4500" />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {showConfetti && <Confetti />}
        </>
    );
};

export default LotteryMachine;
