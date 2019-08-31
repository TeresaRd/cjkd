import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

@inject('store')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '超级考典'
  }

  navTo = (path) => {
    Taro.navigateTo({
      url: path
    })
  }

  render () {
    const {store: {testList}} = this.props;
    return (
      <View className='link-container'>
        <View className='link' onClick={() => {this.navTo('/pages/exercise/exercise')}}>
          <View className='link-bg'>
            <View className='link-content bg-first t-center pt-40'>
              <View className='fs12 clfff'>顺序练题</View>
              <View className='fs10 clfff mt-10'>{testList.length}/1433</View>
            </View>
          </View>
        </View>
        <View className='link' onClick={() => {this.navTo('/pages/examination/examination')}}>
          <View className='link-bg'>
            <View className='link-content bg-second t-center pt-40'>
              <View className='fs12 clfff'>模拟考试</View>
              <View className='fs10 clfff mt-10'>未考试</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index
