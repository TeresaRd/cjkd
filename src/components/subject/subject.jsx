import Taro, { Component } from '@tarojs/taro'
import { View, Text, Icon } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './subject.scss'
import './../../app.scss'

@inject('store')
@observer
class Subject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      info: props.info || {}
    }
  }
  checkHandle = (status) => {
    if (this.props.mode || !!this.state.info.status) {
      return ;
    }
    this.setState(Object.assign(this.state.info, {status}));
    if (status == this.state.info.ta) {
      this.props.nextHandle();
    }
  };

  render () {
    const { mode } = this.props;
    const { info } = this.state;
    let {itemType, a, b, c, d, ta, status, bestanswer} = info || {};
    a = a || (itemType == 1 ? '正确' : '');
    b = b || (itemType == 1 ? '错误' : '');
    const answers = itemType == 1 ? {a, b} : {a, b, c, d};
    const keys = Object.keys(answers);
    function checkError(index) {
      return !!status && status == (index + 1) && status != ta && !mode;
    }
    function checkSuccess(index) {
      return (!!status && (index + 1) == ta || mode && ta == (index + 1));
    }
    return (
      <View className='pd-30'>
        <View>
          <Text className='item-type'>{info.itemType == 1 ? '判断' : '选择'}</Text>
          <Text className='fs12'>{info.question}</Text>
        </View>
        <View className='pt-20'>
          {
            Object.keys(answers).map((key, index) => {
              return (
                <View onClick={() => {this.checkHandle((index + 1).toString())}} key={'answer' + index} className='fs12 mt-20 answer'>
                  <View className='answer-num'>
                    {
                      checkError(index)
                        &&
                      <Icon className='answer-icon' type='clear' color='#fd0000' size={26} />
                    }
                    {
                      checkSuccess(index)
                        &&
                      <Icon className='answer-icon' type='success' color='lightseagreen' size={26} />
                    }
                    {
                      (status != (index + 1) && ((index + 1) != ta || !status) && !mode || mode && ta != (index + 1))
                        &&
                      <Text className='answer-str fs12'>{key.toUpperCase()}</Text>
                    }
                  </View>
                  <View className={checkError(index) ? 'answer-text cl-error' : (checkSuccess(index) ? 'answer-text cl-success' : 'answer-text')}>
                    {answers[key]}
                  </View>
                </View>
              )
            })
          }
          {
            (mode || !!status)
              &&
            (
              <View>
                <View className='answer-show fs12 mt-40'>答案：{keys[Number(ta)-1].toUpperCase()}</View>
                {
                  bestanswer
                    &&
                  (
                    <View>
                      <View className='app-title mt-40 fs12'>题目解析</View>
                      <View className='mt-20 fs11'>
                        {bestanswer ? bestanswer.replace('&quot;', '《').replace('&quot;', '》') : ''}
                      </View>
                    </View>
                  )
                }
              </View>
            )
          }
        </View>
      </View>
    )
  }
}

export default Subject
