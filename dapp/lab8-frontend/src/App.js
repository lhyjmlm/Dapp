import React, { useState } from 'react';
import { render } from 'react-dom';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.css';
import store from './store';
import { Provider } from 'react-redux';
import SignUp from './components/signup';
import Delegate from './components/delegate';
import ConfList from './components/conflist';
import MyConf from './components/myconf';
import NewConf from './components/newconf';
import Enroll from './components/enroll';
import EnrollFor from './components/enrollfor';
import contract from './contracts/contract'; // assuming this is the contract object

const App = () => {
  const [date, setDate] = useState(null);

  const handleSignin = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const result = await contract.methods.get().send({ from: accounts[0] });
      console.log(`Transaction hash: ${result.transactionHash}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  return (
    <Provider store={store}>
      <Grid celled='internally'>
        <Grid.Row columns={2}>
          <Grid.Column width={5}>
            <Grid.Row columns={1}>
              <Segment raised>
                <Header>Sign Up</Header>
                <SignUp />
              </Segment>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Segment raised>
                <Header>My Conferences</Header>
                <MyConf />
              </Segment>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={11}>
            <Segment raised>
              <Header>Conference List</Header>
              <ConfList />
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4}>
          <Grid.Column>
            <Segment raised>
              <Header>New Conference</Header>
              <NewConf />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised>
              <Header>Enroll</Header>
              <Enroll />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised>
              <Header>Enroll For</Header>
              <EnrollFor />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised>
              <Header>Delegate</Header>
              <Delegate />
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          本处是拓展实验的签到按钮：
          <Button onClick={handleSignin}>签到</Button>
        </Grid.Row>

      </Grid>
    </Provider>
  );
};

export default App;