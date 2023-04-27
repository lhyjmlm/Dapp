import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import contract from '../../contracts/contract';

class Delegate extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();

    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const from = accounts[0];
        const { address } = this.props;

        // Call the delegate method on the contract
        contract.methods.delegate(address)
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
    const address = event.target.value;
    this.props.handleChange(address);
  };

  render() {
    const { address } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <input placeholder="trustee's address" value={address} onChange={this.handleChange} />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  address: state.delegate.address,
});

const mapDispatchToProps = (dispatch) => ({
  submit: () => dispatch({ type: 'submit_delegate' }),
  handleChange: (address) => dispatch({ type: 'address', value: address }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Delegate);