/**
 * 高级随机数生成工具
 * 结合多种随机源和加密级随机数生成器来提高随机性
 */

import seedrandom from 'seedrandom';

/**
 * 生成一个指定范围内的加密级随机数
 * @param {number} min 最小值（包含）
 * @param {number} max 最大值（包含）
 * @returns {number} 生成的随机数
 */
export const getSecureRandom = (min, max) => {
  // 使用加密级随机数生成器（如果可用）
  let randomValue;

  if (window.crypto && window.crypto.getRandomValues) {
    // 创建一个新的Uint32Array，长度为1
    const array = new Uint32Array(1);
    // 使用加密API填充数组
    window.crypto.getRandomValues(array);
    // 将生成的值归一化到0-1范围
    randomValue = array[0] / (0xffffffff + 1);
  } else {
    // 回退到Math.random()
    randomValue = Math.random();
  }

  // 将随机值映射到指定范围
  return Math.floor(randomValue * (max - min + 1)) + min;
};

/**
 * 生成一个混合随机种子
 * 结合多种因素：当前时间、性能计数器、用户交互、设备信息等
 * @returns {number} 生成的随机种子
 */
export const generateMixedSeed = () => {
  const now = new Date();

  // 时间因子
  const timeFactor = now.getTime();

  // 性能计数器（如果可用）
  const performanceFactor = window.performance && window.performance.now ?
    window.performance.now() * 1000 : 0;

  // 设备信息
  const screenFactor = (window.screen.width * window.screen.height *
    window.screen.colorDepth) || 0;

  // 用户代理字符串的哈希值
  const userAgentFactor = hashString(navigator.userAgent);

  // 结合所有因子
  const combinedSeed = (timeFactor ^ performanceFactor ^ screenFactor ^ userAgentFactor) % 2147483647;

  return combinedSeed;
};

/**
 * 简单的字符串哈希函数
 * @param {string} str 要哈希的字符串
 * @returns {number} 哈希值
 */
const hashString = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }

  return Math.abs(hash);
};

/**
 * 使用Fisher-Yates洗牌算法打乱数组
 * @param {Array} array 要打乱的数组
 * @returns {Array} 打乱后的数组
 */
export const shuffleArray = (array) => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    // 使用加密级随机数
    const j = getSecureRandom(0, i);
    // 交换元素
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

/**
 * 高级随机数选择器 - 从指定范围内选择不重复的随机数
 * @param {number} count 要选择的数字数量
 * @param {number} max 最大值
 * @returns {Array} 选择的随机数数组
 */
export const pickRandomNumbers = (count, max) => {
  // 生成混合随机种子
  const seed = generateMixedSeed();

  // 创建一个包含所有可能数字的数组
  const allNumbers = Array.from({ length: max }, (_, i) => i + 1);

  // 使用种子初始化随机数生成器
  const rng = seedrandom(seed.toString());

  // 使用自定义的随机数生成器替换Math.random
  const originalRandom = Math.random;
  Math.random = rng;

  // 打乱数组
  const shuffled = shuffleArray(allNumbers);

  // 选择前count个元素
  // 恢复原始的Math.random
  Math.random = originalRandom;

  return shuffled.slice(0, count);
};

/**
 * 生成彩票号码
 * @param {number} frontCount 前区号码数量
 * @param {number} frontMax 前区最大值
 * @param {number} backCount 后区号码数量
 * @param {number} backMax 后区最大值
 * @returns {Object} 包含前区和后区号码的对象
 */
export const generateLotteryNumbers = (frontCount, frontMax, backCount, backMax) => {
  // 生成前区号码
  const frontNumbers = pickRandomNumbers(frontCount, frontMax);

  // 生成后区号码
  const backNumbers = pickRandomNumbers(backCount, backMax);

  return {
    front: frontNumbers,
    back: backNumbers
  };
};
