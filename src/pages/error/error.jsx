import Taro, {Component} from "@tarojs/taro";
import Exercise from '../../components/exercise/exercise'

class Error extends Component {
  config = {
    navigationBarTitleText: '错题练习'
  };
  render() {
    return <Exercise />
  }
}

export default Error;
