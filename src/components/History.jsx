import React, { useState, useEffect } from 'react';
import { Card, List, Pagination, Button, Tooltip, Tag } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const History = ({ history }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // 每页显示5条记录

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

    // 计算当前页的数据
    const currentData = history.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // 当历史记录变化时，确保当前页是有效的
    useEffect(() => {
        if (history.length > 0 && Math.ceil(history.length / pageSize) < currentPage) {
            setCurrentPage(1);
        }
    }, [history.length, pageSize, currentPage]);

    // 处理分页变化
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 清除所有历史记录
    const clearAllHistory = () => {
        if (window.confirm('确定要清除所有历史记录吗？此操作不可恢复。')) {
            localStorage.removeItem('lottery_history');
            window.location.reload(); // 刷新页面以清除状态
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Card
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>🎖️ 历史摇奖记录</span>
                        {history.length > 0 && (
                            <Tooltip title="清除所有记录">
                                <Button
                                    type="text"
                                    icon={<ClearOutlined />}
                                    onClick={clearAllHistory}
                                    style={{ color: 'white' }}
                                />
                            </Tooltip>
                        )}
                    </div>
                }
                style={{
                    width: '100%',
                    maxWidth: 500,
                    marginTop: 20,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
                headStyle={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #d40000, #ff4d4f)',
                    color: 'white'
                }}
            >
                <List
                    dataSource={currentData}
                    locale={{ emptyText: '暂无摇奖记录' }}
                    renderItem={(item) => (
                        <List.Item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <div>
                                    <Tag color="#d40000">第{item.drawNum || '未知'}期</Tag>
                                    <span style={{ marginLeft: 8 }}>{dayjs(item.date).format('YYYY-MM-DD HH:mm:ss')}</span>
                                </div>
                            </div>
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <div style={{ marginBottom: 5 }}>
                                    {item.front.sort((a,b)=>a-b).map(num => renderBall(num, 'front'))}
                                    <span style={{ margin: '0 5px', color: '#888' }}>|</span>
                                    {item.back.sort((a,b)=>a-b).map(num => renderBall(num, 'back'))}
                                </div>
                            </div>
                        </List.Item>
                    )}
                />

                {/* 分页器 */}
                {history.length > pageSize && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                        <Pagination
                            current={currentPage}
                            onChange={handlePageChange}
                            total={history.length}
                            pageSize={pageSize}
                            size="small"
                        />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default History;
