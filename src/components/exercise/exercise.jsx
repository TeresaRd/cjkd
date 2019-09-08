import Taro, { Component } from '@tarojs/taro'
import {Swiper, SwiperItem, View} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Subject from '../subject/subject';

@inject('store')
@observer
class Exercise extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      list: this.props.store.checkedList.splice(0,2)
    };
  }

  componentWillMount() {
    Taro.showLoading();
  }

  componentDidMount () {
    Taro.hideLoading();
  }

  nextHandle = () => {
    if (this.state.current < this.props.store.checkedList.length - 1) {
      setTimeout(() => {
        this.setState(this.state.current++);
      }, 300);
    }
  };

  changeHandle = (detail) => {
    const current = detail.currentTarget.current;
    this.setState({
      current
    });
    const list = this.state.list;
    const storeList = this.props.store.checkedList;
    if (current == list.length - 1) {
      if (list.length < storeList.length) {
        this.setState(this.state.list.push(...storeList.splice(list.length, list.length + 2)));
      }
    }
  };

  render () {
    // this.setState({list: JSON.parse(JSON.stringify(this.props.store.subjectList))})
    const len = this.state.list.length;
    return (
      <View style={style}>
        <Swiper onChange={this.changeHandle} current={this.state.current} duration={200} style={{height: '100%', overflowY: 'auto'}}>
          {
            this.state.list.map((item, index) => {
              return (
                <SwiperItem key={'swiper'+index}>
                  <Subject index={index} len={len} nextHandle={this.nextHandle} info={item} key={'subject'+index} />
                </SwiperItem>
              )
            })
          }
        </Swiper>
      </View>
    )
  }
}
const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  paddingBottom: 60
};
export default Exercise
