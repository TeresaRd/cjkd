import Taro from '@tarojs/taro';

const baseUrl = "http://127.0.0.1:8888/api";

export const postJson = (url, data) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      method: 'POST',
      url: baseUrl + url,
      data: data,
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      if (res.statusCode === 200) {
        const respData = res.data || {};
        if (respData.code === 200) {
          resolve(respData.data)
        }
      }
    })
  })
};

export const getRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: baseUrl + url,
      data: data
    }).then(res => {
      if (res.statusCode === 200) {
        const respData = res.data || {};
        if (respData.code === 200) {
          resolve(respData.data)
        }
      }
    })
  })
};

export const getOrigin = (url, data) => {
  return Taro.request({
    url: url,
    data: data
  })
};

export const getStorage = (key) => {
  return Taro.getStorage({key});
};

export const setStorage = (key, data) => {
  Taro.setStorage({key, data});
};
