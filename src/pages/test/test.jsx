import Taro, {Component} from "@tarojs/taro";
import Exercise from '../../components/exercise/exercise'

class Test extends Component {
  config = {
    navigationBarTitleText: '顺序练习'
  };
  render() {
    return <Exercise />
  }
}

export default Test;
