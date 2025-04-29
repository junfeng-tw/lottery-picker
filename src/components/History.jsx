import React, { useState, useEffect } from 'react';
import { Card, List, Pagination, Button, Tooltip } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const History = ({ history }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // 每页显示5条记录

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
                            <div style={{ fontWeight: 'bold', marginBottom: 5 }}>
                                {dayjs(item.date).format('YYYY-MM-DD HH:mm:ss')}
                            </div>
                            <div>
                                <span style={{ color: '#ff6347', fontWeight: 'bold' }}>前区</span> [{item.front.sort((a,b)=>a-b).join(', ')}]，
                                <span style={{ color: '#ff4500', fontWeight: 'bold' }}>后区</span> [{item.back.sort((a,b)=>a-b).join(', ')}]
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
