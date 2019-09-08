import Taro, {} from '@tarojs/taro'
import { observable, action, computed } from 'mobx'
import { getStorage, setStorage } from "../lib"
import { allSubject, login, updateLog, userExercise, clearError } from "../api"

class Store {
  constructor() {
    // 登陆验证
    getStorage('userInfo').then(res => {
      if (res.data) {
        this.userInfo = JSON.parse(res.data);
        this.init();
      }
    }).catch(() => {
      this.initWithoutLogin();
      // this.login();
    });
    // 初始化题库
    this.getSubjectList();
  }

  @observable subjectList = []; // 所有题目
  @observable userInfo = {}; // 用户信息
  @observable exerciseList = []; // 练习记录
  @observable checkedList = []; // 正在做的题

  @computed get errorList() {
    return this.exerciseList.filter(item => item.status == 2);
  }

  @action setSubjectList(list) {
    this.subjectList = list;
    setStorage('subjects', JSON.stringify(list));
  }
  @action getSubjectList() {
    getStorage('subjects').then(res => {
      this.subjectList = JSON.parse(res.data);
    }).catch(() => {
      Taro.showLoading({
        title: '题库加载中',
        mask: true
      });
      allSubject().then(data => {
        Taro.hideLoading();
        this.setSubjectList(data || [])
      }).catch(() => {
        Taro.hideLoading();
      })
    });
  }
  @action setCheckList(type) {
    switch (type) {
      case 1: // 顺序练习
        this.checkedList = this.subjectList;break;
      case 2: // 错题练习
        this.checkedList = this.subjectList.filter(item => {
          return this.errorList.findIndex(error => error.id == item.id) > -1;
        });
        break;
    }
  }
  // 未登陆状态取缓存数据
  @action initWithoutLogin() {
    getStorage('exerciseList').then(res => {
      if (res.data) {
        this.exerciseList = JSON.parse(res.data);
      }
    }).catch(() => {
      this.initWithoutLogin();
      // this.login();
    })
  }
  // 初始化个人数据
  @action init() {
    userExercise({userId: this.userInfo.userId}).then(data => {
      this.exerciseList = data;
    }).catch(res => {})
  }
  @action login() {
    Taro.getSetting().then(res => {
      if (res.authSetting['scope.userInfo']) {
        Taro.getUserInfo().then(res => {
          let userInfo = {};
          if (res.userInfo) {
            userInfo = res.userInfo;
            Taro.login().then(res => {
              if (res.code) {
                Taro.showLoading({
                  title: '登陆中'
                });
                login({
                  appid: 'wx80bdba4540f6ae2d',
                  secret: 'ae6037711fba0b759ac3ec90a9174429',
                  js_code: res.code,
                  grant_type: 'authorization_code'
                }).then(resp => {
                  Taro.hideLoading();
                  if (resp.statusCode == 200) {
                    if (resp.data && resp.data.openid) {
                      userInfo.userId = resp.data.openid;
                      this.userInfo = userInfo;
                      setStorage('userInfo', JSON.stringify(userInfo));
                      this.getSubjectList();
                      this.init();
                    }
                  }
                })
              }
            })
          }
        });
      } else {
        Taro.showToast({
          title: '请开启微信授权',
          icon: 'error'
        })
      }
    });
  }
  @action addExercise(item) {
    const userId = this.userInfo.userId;
    if (userId) {
      updateLog(Object.assign(item, {userId: userId}))
    } else {
      const index = this.exerciseList.findIndex(ex => ex.id == item.id);
      if (index > -1) {
        this.exerciseList[index].lastStatus = item.status;
      } else {
        item.lastStatus = item.status;
        this.exerciseList.push(item);
        setStorage('exerciseList', JSON.stringify(this.exerciseList));
      }
    }
  }
  @action clearError() {
    Taro.showLoading();
    clearError(this.userInfo.userId).then(data => {
      Taro.hideLoading();
      Taro.showToast({title: '清除成功'});
      this.exerciseList = data;
    }).catch(res => {
      Taro.hideLoading();
      Taro.showToast({title: '请求异常'});
    })
  }
}
export default new Store()
