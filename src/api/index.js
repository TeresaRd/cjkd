import {postJson, getOrigin, getRequest} from "../lib";

export const allSubject = () => {
  return getRequest('/sys/all');
};

// 更新用户练习题
export const updateLog = (params) => {
  return postJson('sys/exercise', params);
};

// 获取用户所有练习题
export const userExercise = (params) => {
  return getRequest('/sys/userExercise', params);
};

// 清除用户错题集
export const clearError = (userId) => {
  return postJson('/sys/clearError', userId);
};

// 登陆获取openid
export const login = (params) => {
  return getOrigin('https://api.weixin.qq.com/sns/jscode2session', params);
};
