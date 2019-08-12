import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

@inject('counterStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '超级考典'
  }

  componentWillMount () { }

  componentWillReact () {

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='link-container'>
        <View className='link'>
          <View className='link-bg'>
            <View className='link-content bg-first'></View>
          </View>
        </View>
        <View className='link'>
          <View className='link-bg'>
            <View className='link-content bg-second'></View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index
