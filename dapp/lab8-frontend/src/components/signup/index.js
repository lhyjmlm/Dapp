import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import contract from '../../contracts/contract';

class SignUp extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();

    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const from = accounts[0];
        const { username, extra } = this.props;

        // Call the signUp method on the contract
        contract.methods.signUp(username, extra)
          .send({ from })
          .then((res) => console.log(res)); // Log the transaction information
      } catch (error) {
        console.error('Failed to connect to Ethereum:', error);
      }
    } else {
      console.error('MetaMask not detected');
    }

    this.props.submit();
  };

  handleChange = (event) => {
    const { placeholder, value } = event.target;
    if (placeholder === 'username') {
      this.props.setUsername(value);
    } else if (placeholder === 'extra') {
      this.props.setExtra(value);
    }
  };

  render() {
    const { username, extra } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <input placeholder="username" value={username} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <input placeholder="extra" value={extra} onChange={this.handleChange} />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.signup.username,
  extra: state.signup.extra,
});

const mapDispatchToProps = (dispatch) => ({
  submit: () => dispatch({ type: 'submit_signup' }),
  setUsername: (username) => dispatch({ type: 'username', value: username }),
  setExtra: (extra) => dispatch({ type: 'extra', value: extra }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);