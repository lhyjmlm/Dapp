import React, { Component } from 'react'
import { List } from 'antd'
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import Web3 from 'web3'
import contract from '../../contracts/contract'

const data = [];

class MyConf extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, data: [] };
  }

  async componentDidMount() {
    // 检查 MetaMask 是否已经安装
    if (typeof window.ethereum !== 'undefined') {
      try {
        // 请求用户授权访问其账户信息
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // 初始化 Web3 对象
        const web3 = new Web3(window.ethereum);
        // 执行查询操作
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.queryMyConf().call({ from: accounts[0] });
        const data = result ? result.map(title => ({ conf: title })) : [{ conf: 'no' }];
        // 更新组件状态，使页面数据重新渲染
        this.setState({ data });
        // 监听新会议事件
        contract.events.MyNewConference({
          filter: {},
          fromBlock: await web3.eth.getBlockNumber(),
        }, (error, event) => {
          if (error) {
            console.error('Error in MyNewConference event:', error);
            return;
          }
          const newConf = { conf: event.returnValues[0] };
          this.setState(prevState => ({ data: [...prevState.data, newConf] }));
        });
      } catch (error) {
        console.error('MetaMask authorization failed:', error);
      }
    } else {
      console.error('MetaMask is not installed!');
    }
  }

  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.state.data}
        loading={this.state.loading}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.conf}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default MyConf;