import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

@inject('store')
@observer
class Index extends Component {
  config = {
    navigationBarTitleText: '超级考典',
    enablePullDownRefresh: true
  };

  onPullDownRefresh() {
    this.props.store.getSubjectList();
  }

  navTo = (path) => {
    Taro.navigateTo({
      url: path
    })
  };

  subjectHandle = (type) => {
    if (type == 2 && this.props.store.errorList.length == 0) {
      Taro.showToast({
        title: '错题集为空',
        icon: 'none'
      });
      return false;
    }
    const navs = ['/pages/test/test', '/pages/error/error', '/pages/examination/examination'];
    this.props.store.setCheckList(type);
    this.navTo(navs[type - 1]);
  };

  login = () => {
    this.props.store.login();
  };

  render () {
    const {store: {subjectList, exerciseList, errorList, userInfo}} = this.props;
    const [subjectLen, exerciseLen, errorLen] = [subjectList.length, exerciseList.length, errorList.length];
    return (
      <View className='link-container'>
        <View className='link' onClick={() => {this.subjectHandle(1)}}>
          <View className='link-bg'>
            <View className='link-content bg-first t-center pt-40'>
              <View className='fs12 clfff'>顺序练题</View>
              <View className='fs10 clfff mt-10'>{exerciseLen}/{subjectLen}</View>
            </View>
          </View>
        </View>
        <View className='link' onClick={() => {this.subjectHandle(3)}}>
          <View className='link-bg'>
            <View className='link-content bg-second t-center pt-40'>
              <View className='fs12 clfff'>模拟考试</View>
              <View className='fs10 clfff mt-10'>未考试</View>
            </View>
          </View>
        </View>
        <View className='link' onClick={() => {this.subjectHandle(2)}}>
          <View className='link-bg'>
            <View className='link-content bg-third t-center pt-40'>
              <View className='fs12 clfff'>错题练习</View>
              <View className='fs10 clfff mt-10'>{errorLen}</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index
