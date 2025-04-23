import React, { useState } from 'react';
import LotteryMachine from './components/LotteryMachine';
import History from './components/History';

function App() {
    const [history, setHistory] = useState([]);

    const handleFinish = (result) => {
        setHistory((h) => [result, ...h.slice(0, 4)]);
    };

    return (
        <div style={{ maxWidth: 600, width: '100%', padding: 20, textAlign: 'center' }}>
            <h1 style={{ color: '#d40000' }}>🎉 大乐透幸运机选 🎉</h1>
            <LotteryMachine onFinish={handleFinish} />
            <History history={history} />
        </div>
    );
}

export default App;
