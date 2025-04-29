import React, { useState, useEffect } from 'react';
import { Card, List, Pagination, Tag, Tooltip, Spin } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const OfficialResults = ({ setLotteryData: setParentLotteryData }) => {
    const [lotteryData, setLotteryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // 每页显示5条记录

    useEffect(() => {
        const fetchLotteryData = async () => {
            setLoading(true);
            try {
                // 直接从体彩官方API获取数据
                const response = await fetch(
                    'https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&pageSize=10&isVerify=1&pageNo=1'
                );
                const data = await response.json();

                if (data.success && data.value && data.value.list) {
                    // 处理API返回的数据
                    const formattedData = data.value.list.map(item => {
                        // 将开奖结果字符串拆分为数组
                        const numbers = item.lotteryDrawResult.split(' ');
                        return {
                            期号: item.lotteryDrawNum,
                            开奖日期: item.lotteryDrawTime,
                            前1: numbers[0],
                            前2: numbers[1],
                            前3: numbers[2],
                            前4: numbers[3],
                            前5: numbers[4],
                            后1: numbers[5],
                            后2: numbers[6],
                            奖池: item.poolBalanceAfterdraw,
                            销售额: item.totalSaleAmount
                        };
                    });
                    setLotteryData(formattedData);
                    // 同时更新父组件的状态
                    if (typeof setParentLotteryData === 'function') {
                        setParentLotteryData(formattedData);
                    }
                }
            } catch (error) {
                console.error('获取开奖数据失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLotteryData();
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
                {String(number).padStart(2, '0')}
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 20 }}>
            <Card
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>🏆 官方开奖结果</span>
                        <Tooltip title="数据来源于体彩官方网站，实时更新">
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
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <Spin tip="加载中..." />
                    </div>
                ) : (
                    <>
                        <List
                            dataSource={currentData}
                            locale={{ emptyText: '暂无开奖数据' }}
                            renderItem={(item) => (
                                <List.Item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <div>
                                            <Tag color="#108ee9">第{item.期号}期</Tag>
                                            <span style={{ marginLeft: 8 }}>{item.开奖日期}</span>
                                        </div>
                                        <div>
                                            <small style={{ color: '#888' }}>奖池: {item.奖池}</small>
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                        <div style={{ marginBottom: 5 }}>
                                            {[item.前1, item.前2, item.前3, item.前4, item.前5].map((num, index) => renderBall(num, 'front'))}
                                            <span style={{ margin: '0 5px', color: '#888' }}>|</span>
                                            {[item.后1, item.后2].map((num, index) => renderBall(num, 'back'))}
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />

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
                    </>
                )}
            </Card>
        </div>
    );
};

export default OfficialResults;