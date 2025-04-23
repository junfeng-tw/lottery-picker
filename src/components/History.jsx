import React from 'react';
import { Card, List } from 'antd';
import dayjs from 'dayjs';

const History = ({ history }) => (
    <Card title="🎖️ 最近5期摇奖结果" style={{ width: '100%', maxWidth: 500, marginTop: 20 }}>
        <List
            dataSource={history}
            renderItem={(item) => (
                <List.Item>
                    {dayjs(item.date).format('YYYY-MM-DD HH:mm:ss')}：
                    前区 [{item.front.sort((a,b)=>a-b).join(', ')}]，
                    后区 [{item.back.sort((a,b)=>a-b).join(', ')}]
                </List.Item>
            )}
        />
    </Card>
);

export default History;
