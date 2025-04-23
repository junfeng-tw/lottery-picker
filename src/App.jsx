import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LotteryMachine from './components/LotteryMachine';
import History from './components/History';

function App() {
    const [history, setHistory] = useState([]);
    const [luckyQuote, setLuckyQuote] = useState('');

    // 幸运语录数组
    const luckyQuotes = [
        "今天的幸运，源于你的勇气！",
        "好运不是偶然，而是命中注定！",
        "幸运总是眷顾有准备的人！",
        "相信自己，好运自然来！",
        "幸运的种子已经播下，等待收获的季节！",
        "你的幸运数字，就在这一刻诞生！",
        "宇宙的能量正在为你汇聚！",
        "命运之轮正在为你转动！",
        "星辰大海，皆为你的幸运加持！",
        "这一刻，幸运女神正在向你微笑！"
    ];

    // 随机选择一条幸运语录
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * luckyQuotes.length);
        setLuckyQuote(luckyQuotes[randomIndex]);
    }, []);

    const handleFinish = (result) => {
        setHistory((h) => [result, ...h.slice(0, 4)]);
        // 每次摇奖后更换幸运语录
        const randomIndex = Math.floor(Math.random() * luckyQuotes.length);
        setLuckyQuote(luckyQuotes[randomIndex]);
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            background: 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px 10px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* 背景动画元素 */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: 0 }}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={`star-${i}`}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: Math.random() * 0.5 + 0.3,
                            scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            repeatType: 'reverse'
                        }}
                        style={{
                            position: 'absolute',
                            width: 3 + Math.random() * 4,
                            height: 3 + Math.random() * 4,
                            borderRadius: '50%',
                            background: 'white',
                            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)'
                        }}
                    />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                        key={`lucky-symbol-${i}`}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0.1,
                            rotate: 0
                        }}
                        animate={{
                            y: [null, Math.random() * window.innerHeight],
                            opacity: [0.1, 0.2, 0.1],
                            rotate: 360
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            repeatType: 'loop'
                        }}
                        style={{
                            position: 'absolute',
                            fontSize: 30 + Math.random() * 20,
                            color: 'rgba(255, 215, 0, 0.2)'
                        }}
                    >
                        {['🍀', '🌟', '💫', '✨', '🎯', '🎲'][Math.floor(Math.random() * 6)]}
                    </motion.div>
                ))}
            </div>

            {/* 主内容区 */}
            <div style={{
                maxWidth: 700,
                width: '100%',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    style={{
                        color: '#FFD700',
                        textShadow: '0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.5)',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        marginBottom: 10,
                        textAlign: 'center'
                    }}
                >
                    🎯 超级幸运大乐透 🎯
                </motion.h1>

                {/* 幸运语录 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    key={luckyQuote} // 确保每次更新语录时都有动画
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        padding: '10px 20px',
                        borderRadius: 30,
                        marginBottom: 20,
                        color: '#FFD700',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        maxWidth: 500,
                        boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)'
                    }}
                >
                    <span style={{ fontSize: 18 }}>"{luckyQuote}"</span>
                </motion.div>

                <LotteryMachine onFinish={handleFinish} />
                <History history={history} />

                {/* 底部信息 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 1.5 }}
                    style={{
                        marginTop: 30,
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: 12,
                        textAlign: 'center'
                    }}
                >
                    <p>数字生成基于时间种子的随机算法 | 仅供娱乐，祝您好运！</p>
                </motion.div>
            </div>
        </div>
    );
}

export default App;
