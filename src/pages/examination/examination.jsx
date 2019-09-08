import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'


@inject('store')
@observer
class Examination extends Component {

  config = {
    navigationBarTitleText: '模拟考试'
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
      <View>

      </View>
    )
  }
}

export default Examination
