import React, { useState, useEffect } from 'react';
import { Card, List, Pagination, Button, Tooltip, Tag, Badge, Popover, Modal } from 'antd';
import { ClearOutlined, TrophyOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { calculatePrizeLevel, getPrizeLevelColor } from '../utils/prizeUtils';

const History = ({ history, lotteryData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isRulesModalVisible, setIsRulesModalVisible] = useState(false);
    const pageSize = 5; // 每页显示5条记录

    // 渲染号码球
    const renderBall = (number, type, matched = false) => {
        const color = type === 'front' ? '#ff6347' : '#ff4500';
        const lightColor = type === 'front' ? '#ff8367' : '#ff6525';
        const darkColor = type === 'front' ? '#e54327' : '#d43500';

        // 非匹配球的样式
        const nonMatchedStyle = {
            border: '2px solid gold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 3px rgba(0,0,0,0.2), inset 0 2px 3px rgba(255,255,255,0.2)'
        };

        return (
            <div
                key={`${type}-${number}`}
                className={matched ? "matched-ball" : ""}
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
                    margin: '0 3px',
                    ...(!matched && nonMatchedStyle),
                    // 匹配球的样式已经在CSS动画中定义
                }}
            >
                {String(number).padStart(2, '0')}
            </div>
        );
    };

    // 添加全局样式到组件挂载时
    useEffect(() => {
        // 创建样式元素
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
            @keyframes lottery-ball-pulse {
                0% { box-shadow: 0 0 10px #FFD700, 0 0 20px rgba(255, 215, 0, 0.5), inset 0 -2px 3px rgba(0,0,0,0.2), inset 0 2px 3px rgba(255,255,255,0.2); }
                50% { box-shadow: 0 0 15px #FFD700, 0 0 30px rgba(255, 215, 0, 0.7), inset 0 -2px 3px rgba(0,0,0,0.2), inset 0 2px 3px rgba(255,255,255,0.2); }
                100% { box-shadow: 0 0 10px #FFD700, 0 0 20px rgba(255, 215, 0, 0.5), inset 0 -2px 3px rgba(0,0,0,0.2), inset 0 2px 3px rgba(255,255,255,0.2); }
            }

            @keyframes rainbow-border {
                0% { border-color: #ff0000; }
                14% { border-color: #ff7f00; }
                28% { border-color: #ffff00; }
                42% { border-color: #00ff00; }
                56% { border-color: #0000ff; }
                70% { border-color: #4b0082; }
                84% { border-color: #9400d3; }
                100% { border-color: #ff0000; }
            }

            @keyframes scale-pulse {
                0% { transform: scale(1.05); }
                50% { transform: scale(1.15); }
                100% { transform: scale(1.05); }
            }

            .matched-ball {
                animation: lottery-ball-pulse 1.5s infinite, rainbow-border 2s linear infinite, scale-pulse 1.5s infinite;
                border-width: 3px;
                border-style: solid;
                z-index: 2;
                position: relative;
            }
        `;
        document.head.appendChild(styleElement);

        // 清理函数
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    // 查找对应期号的官方开奖结果
    const findOfficialResult = (drawNum) => {
        if (!lotteryData || !drawNum) return null;
        return lotteryData.find(item => item.期号 === drawNum);
    };

    // 计算中奖等级并显示结果
    const renderPrizeResult = (item) => {
        const officialResult = findOfficialResult(item.drawNum);
        if (!officialResult) return null;

        const officialFront = [officialResult.前1, officialResult.前2, officialResult.前3, officialResult.前4, officialResult.前5];
        const officialBack = [officialResult.后1, officialResult.后2];

        const prizeResult = calculatePrizeLevel(item.front, item.back, officialFront, officialBack);

        // 找出匹配的号码 - 比较数字值而非字符串
        const officialFrontNumbers = officialFront.map(num => parseInt(num));
        const officialBackNumbers = officialBack.map(num => parseInt(num));

        const matchedFront = item.front.filter(num => officialFrontNumbers.includes(parseInt(num)));
        const matchedBack = item.back.filter(num => officialBackNumbers.includes(parseInt(num)));

        const prizeColor = getPrizeLevelColor(prizeResult.level);

        // 中奖详情的弹出内容
        const prizeDetails = (
            <div>
                <p><strong>开奖号码：</strong></p>
                <div style={{ marginBottom: 10 }}>
                    {officialFront.map(num => renderBall(num, 'front'))}
                    <span style={{ margin: '0 5px', color: '#888' }}>|</span>
                    {officialBack.map(num => renderBall(num, 'back'))}
                </div>
                <p><strong>您选择的号码：</strong></p>
                <div style={{ marginBottom: 10 }}>
                    {item.front.sort((a,b)=>a-b).map(num => {
                        // 使用数字值比较
                        const numValue = parseInt(num);
                        const isMatched = matchedFront.some(matchNum => parseInt(matchNum) === numValue);
                        return renderBall(num, 'front', isMatched);
                    })}
                    <span style={{ margin: '0 5px', color: '#888' }}>|</span>
                    {item.back.sort((a,b)=>a-b).map(num => {
                        // 使用数字值比较
                        const numValue = parseInt(num);
                        const isMatched = matchedBack.some(matchNum => parseInt(matchNum) === numValue);
                        return renderBall(num, 'back', isMatched);
                    })}
                </div>
                <p><strong>匹配结果：</strong></p>
                <p>前区匹配：{matchedFront.length}个 / 后区匹配：{matchedBack.length}个</p>
                {prizeResult.level > 0 ? (
                    <p style={{ color: prizeColor, fontWeight: 'bold' }}>
                        恭喜您中得{prizeResult.description}！
                    </p>
                ) : (
                    <p>很遗憾，未中奖。再接再厉！</p>
                )}
            </div>
        );

        return (
            <Popover
                content={prizeDetails}
                title={`第${item.drawNum}期开奖结果对比`}
                placement="left"
                overlayStyle={{ maxWidth: 300 }}
            >
                <Tag
                    icon={<TrophyOutlined />}
                    color={prizeColor}
                    style={{
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: prizeResult.level > 0 ? `0 0 5px ${prizeColor}` : 'none',
                        padding: '4px 8px'
                    }}
                >
                    {prizeResult.level > 0 ? prizeResult.description : '未中奖'}
                </Tag>
            </Popover>
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

    // 显示中奖规则弹窗
    const showRulesModal = () => {
        setIsRulesModalVisible(true);
    };

    // 关闭中奖规则弹窗
    const handleRulesModalClose = () => {
        setIsRulesModalVisible(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Card
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>🎖️ 历史摇奖记录</span>
                        <div>
                            <Tooltip title="查看中奖规则">
                                <Button
                                    type="text"
                                    icon={<QuestionCircleOutlined />}
                                    onClick={showRulesModal}
                                    style={{ color: 'white', marginRight: 5 }}
                                />
                            </Tooltip>
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
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <div>
                                    <Tag color="#d40000">第{item.drawNum || '未知'}期</Tag>
                                    <span style={{ marginLeft: 8 }}>{dayjs(item.date).format('YYYY-MM-DD HH:mm:ss')}</span>
                                </div>
                                <div>
                                    {findOfficialResult(item.drawNum) && renderPrizeResult(item)}
                                </div>
                            </div>
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <div style={{ marginBottom: 5 }}>
                                    {item.front.sort((a,b)=>a-b).map(num => {
                                        const officialResult = findOfficialResult(item.drawNum);
                                        let matched = false;

                                        if (officialResult) {
                                            const officialFront = [officialResult.前1, officialResult.前2, officialResult.前3, officialResult.前4, officialResult.前5];
                                            const officialFrontNumbers = officialFront.map(n => parseInt(n));
                                            matched = officialFrontNumbers.includes(parseInt(num));
                                        }

                                        return renderBall(num, 'front', matched);
                                    })}
                                    <span style={{ margin: '0 5px', color: '#888' }}>|</span>
                                    {item.back.sort((a,b)=>a-b).map(num => {
                                        const officialResult = findOfficialResult(item.drawNum);
                                        let matched = false;

                                        if (officialResult) {
                                            const officialBack = [officialResult.后1, officialResult.后2];
                                            const officialBackNumbers = officialBack.map(n => parseInt(n));
                                            matched = officialBackNumbers.includes(parseInt(num));
                                        }

                                        return renderBall(num, 'back', matched);
                                    })}
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

            {/* 中奖规则弹窗 */}
            <Modal
                title="大乐透中奖规则"
                open={isRulesModalVisible}
                onCancel={handleRulesModalClose}
                footer={null}
                width={600}
            >
                <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
                    <p><strong>一等奖：</strong>投注号码与当期开奖号码全部相同(顺序不限，下同)，即中奖；</p>
                    <p><strong>二等奖：</strong>投注号码与当期开奖号码中的五个前区号码及任意一个后区号码相同，即中奖；</p>
                    <p><strong>三等奖：</strong>投注号码与当期开奖号码中的五个前区号码相同，即中奖；</p>
                    <p><strong>四等奖：</strong>投注号码与当期开奖号码中的任意四个前区号码及两个后区号码相同，即中奖；</p>
                    <p><strong>五等奖：</strong>投注号码与当期开奖号码中的任意四个前区号码及任意一个后区号码相同，即中奖；</p>
                    <p><strong>六等奖：</strong>投注号码与当期开奖号码中的任意三个前区号码及两个后区号码相同，即中奖；</p>
                    <p><strong>七等奖：</strong>投注号码与当期开奖号码中的任意四个前区号码相同，即中奖；</p>
                    <p><strong>八等奖：</strong>投注号码与当期开奖号码中的任意三个前区号码及任意一个后区号码相同，或者任意两个前区号码及两个后区号码相同，即中奖；</p>
                    <p><strong>九等奖：</strong>投注号码与当期开奖号码中的任意三个前区号码相同，或者任意一个前区号码及两个后区号码相同，或者任意两个前区号码及任意一个后区号码相同，或者两个后区号码相同，即中奖。</p>
                </div>
            </Modal>
        </div>
    );
};

export default History;
