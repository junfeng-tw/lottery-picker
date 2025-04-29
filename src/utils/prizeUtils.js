/**
 * 计算中奖等级
 * @param {Array} userFront 用户选择的前区号码
 * @param {Array} userBack 用户选择的后区号码
 * @param {Array} officialFront 官方开奖的前区号码
 * @param {Array} officialBack 官方开奖的后区号码
 * @returns {Object} 中奖信息，包括等级和描述
 */
export const calculatePrizeLevel = (userFront, userBack, officialFront, officialBack) => {
    // 将字符串数组转换为数字数组，确保比较的是数字值而非字符串
    const userFrontNumbers = userFront.map(num => parseInt(num));
    const userBackNumbers = userBack.map(num => parseInt(num));
    const officialFrontNumbers = officialFront.map(num => parseInt(num));
    const officialBackNumbers = officialBack.map(num => parseInt(num));

    // 计算匹配的前区和后区号码数量
    const matchedFront = userFrontNumbers.filter(num => officialFrontNumbers.includes(num)).length;
    const matchedBack = userBackNumbers.filter(num => officialBackNumbers.includes(num)).length;

    // 根据匹配情况判断中奖等级
    if (matchedFront === 5 && matchedBack === 2) {
        return { level: 1, description: "一等奖" };
    } else if (matchedFront === 5 && matchedBack === 1) {
        return { level: 2, description: "二等奖" };
    } else if (matchedFront === 5 && matchedBack === 0) {
        return { level: 3, description: "三等奖" };
    } else if (matchedFront === 4 && matchedBack === 2) {
        return { level: 4, description: "四等奖" };
    } else if (matchedFront === 4 && matchedBack === 1) {
        return { level: 5, description: "五等奖" };
    } else if (matchedFront === 3 && matchedBack === 2) {
        return { level: 6, description: "六等奖" };
    } else if (matchedFront === 4 && matchedBack === 0) {
        return { level: 7, description: "七等奖" };
    } else if ((matchedFront === 3 && matchedBack === 1) || (matchedFront === 2 && matchedBack === 2)) {
        return { level: 8, description: "八等奖" };
    } else if ((matchedFront === 3 && matchedBack === 0) || (matchedFront === 1 && matchedBack === 2) ||
               (matchedFront === 2 && matchedBack === 1) || (matchedFront === 0 && matchedBack === 2)) {
        return { level: 9, description: "九等奖" };
    } else {
        return { level: 0, description: "未中奖" };
    }
};

/**
 * 获取中奖等级的颜色
 * @param {Number} level 中奖等级
 * @returns {String} 对应的颜色代码
 */
export const getPrizeLevelColor = (level) => {
    switch (level) {
        case 1:
            return "#ff0000"; // 红色
        case 2:
            return "#ff4500"; // 橙红色
        case 3:
            return "#ff8c00"; // 深橙色
        case 4:
            return "#ffa500"; // 橙色
        case 5:
            return "#ffd700"; // 金色
        case 6:
            return "#9acd32"; // 黄绿色
        case 7:
            return "#32cd32"; // 酸橙绿
        case 8:
            return "#00bfff"; // 深天蓝
        case 9:
            return "#1e90ff"; // 道奇蓝
        default:
            return "#888888"; // 灰色（未中奖）
    }
};
