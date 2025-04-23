import React from 'react';
import { Card, List } from 'antd';
import dayjs from 'dayjs';

const History = ({ history }) => (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Card
            title="🎖️ 最近5期摇奖结果"
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
                dataSource={history}
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
        </Card>
    </div>
);

export default History;
