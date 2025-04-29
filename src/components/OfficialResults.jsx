import React, { useState, useEffect } from 'react';
import { Card, List, Pagination, Tag, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

// 模拟的大乐透开奖数据
const mockLotteryData = [
    { 
        id: '23045', 
        date: '2023-04-22', 
        numbers: { front: [3, 10, 16, 20, 25], back: [3, 12] },
        prize: '1000万元',
        sales: '4.56亿元'
    },
    { 
        id: '23046', 
        date: '2023-04-24', 
        numbers: { front: [5, 7, 14, 19, 35], back: [4, 10] },
        prize: '1000万元',
        sales: '4.23亿元'
    },
    { 
        id: '23047', 
        date: '2023-04-26', 
        numbers: { front: [2, 11, 17, 21, 33], back: [2, 8] },
        prize: '1000万元',
        sales: '4.78亿元'
    },
    { 
        id: '23048', 
        date: '2023-04-29', 
        numbers: { front: [8, 13, 18, 27, 30], back: [5, 11] },
        prize: '1000万元',
        sales: '4.92亿元'
    },
    { 
        id: '23049', 
        date: '2023-05-01', 
        numbers: { front: [1, 9, 15, 22, 29], back: [1, 7] },
        prize: '1000万元',
        sales: '5.12亿元'
    },
    { 
        id: '23050', 
        date: '2023-05-03', 
        numbers: { front: [4, 12, 23, 28, 34], back: [6, 9] },
        prize: '1000万元',
        sales: '4.87亿元'
    },
    { 
        id: '23051', 
        date: '2023-05-06', 
        numbers: { front: [6, 19, 24, 31, 32], back: [2, 10] },
        prize: '1000万元',
        sales: '5.03亿元'
    },
    { 
        id: '23052', 
        date: '2023-05-08', 
        numbers: { front: [7, 14, 20, 26, 35], back: [3, 11] },
        prize: '1000万元',
        sales: '4.76亿元'
    },
    { 
        id: '23053', 
        date: '2023-05-10', 
        numbers: { front: [2, 10, 16, 21, 33], back: [5, 8] },
        prize: '1000万元',
        sales: '4.89亿元'
    },
    { 
        id: '23054', 
        date: '2023-05-13', 
        numbers: { front: [5, 11, 17, 25, 30], back: [4, 12] },
        prize: '1000万元',
        sales: '5.21亿元'
    }
];

// 在实际应用中，这个函数会从API获取数据
const fetchLotteryData = () => {
    // 模拟API请求延迟
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockLotteryData);
        }, 500);
    });
};

const OfficialResults = () => {
    const [lotteryData, setLotteryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // 每页显示5条记录

    useEffect(() => {
        const getLotteryData = async () => {
            setLoading(true);
            try {
                const data = await fetchLotteryData();
                setLotteryData(data);
            } catch (error) {
                console.error('获取开奖数据失败:', error);
            } finally {
                setLoading(false);
            }
        };

        getLotteryData();
    }, []);

    // 计算当前页的数据
    const currentData = lotteryData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // 处理分页变化
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 渲染号码球
    const renderBall = (number, type) => {
        const color = type === 'front' ? '#ff6347' : '#ff4500';
        const lightColor = type === 'front' ? '#ff8367' : '#ff6525';
        const darkColor = type === 'front' ? '#e54327' : '#d43500';
        
        return (
            <div
                key={`${type}-${number}`}
                style={{
                    background: `radial-gradient(circle at 30% 30%, ${lightColor}, ${color} 60%, ${darkColor})`,
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 'bold',
                    border: '2px solid gold',
                    margin: '0 3px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 3px rgba(0,0,0,0.2), inset 0 2px 3px rgba(255,255,255,0.2)'
                }}
            >
                {number}
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 20 }}>
            <Card
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>🏆 官方开奖结果</span>
                        <Tooltip title="数据仅供参考，请以官方公布为准">
                            <InfoCircleOutlined style={{ color: 'white' }} />
                        </Tooltip>
                    </div>
                }
                style={{
                    width: '100%',
                    maxWidth: 500,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
                headStyle={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #1890ff, #36cfc9)',
                    color: 'white'
                }}
                loading={loading}
            >
                <List
                    dataSource={currentData}
                    locale={{ emptyText: '暂无开奖数据' }}
                    renderItem={(item) => (
                        <List.Item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <div>
                                    <Tag color="#108ee9">第{item.id}期</Tag>
                                    <span style={{ marginLeft: 8 }}>{item.date}</span>
                                </div>
                                <div>
                                    <small style={{ color: '#888' }}>奖池: {item.prize}</small>
                                </div>
                            </div>
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <div style={{ marginBottom: 5 }}>
                                    {item.numbers.front.map(num => renderBall(num, 'front'))}
                                    <span style={{ margin: '0 5px', color: '#888' }}>|</span>
                                    {item.numbers.back.map(num => renderBall(num, 'back'))}
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
                
                {/* 分页器 */}
                {lotteryData.length > pageSize && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                        <Pagination
                            current={currentPage}
                            onChange={handlePageChange}
                            total={lotteryData.length}
                            pageSize={pageSize}
                            size="small"
                        />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default OfficialResults;
