import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import contract from '../../contracts/contract';

const data = [];

class ConfList extends Component {
  constructor() {
    super();
    this.state = { loading: false };
  }

  componentDidMount() {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        const account = accounts[0];
        // Execute the query with the current account
        contract.methods.queryConfList().call({ from: account }, (err, res) => {
          // Update the data array with the returned values
          this.setState({ loading: true });
          if (res != null) {
            for (var i = 0; i < res.length; i = i + 2) {
              data.push({ title: res[i], detail: res[i + 1] });
            }
          } else {
            data.push({ title: 'no', detail: 'no' });
          }
          // Update the loading state to trigger a re-render
          this.setState({ loading: false });
        });

        //Subscribe to the NewConference event with the current account
        contract.events.NewConference(
          {
            filter: {},
            fromBlock: window.web3.eth.getBlockNumber(),
          },
          (error, event) => {
            this.setState({ loading: true });
            // Add the new conference to the data array
            data.push({ title: event.returnValues[0], detail: event.returnValues[1] });
            // Update the loading state to trigger a re-render
            this.setState({ loading: false });
          }
        );
      }).catch(err => {
        console.error('Failed to get accounts:', err);
      });
    } else {
      console.error('MetaMask not detected');
    }
  }

  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        loading={this.state.loading}
        pagination={{ pageSize: 5, simple: 'true' }}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<CalendarOutlined />} />}
              title={item.title}
              description={item.detail}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default ConfList;