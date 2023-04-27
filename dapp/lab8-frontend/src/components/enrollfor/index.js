import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import contract from "../../contracts/contract"

class EnrollFor extends (Component) {

  handleSubmit = async () => {
    try {
      const { username, title } = this.props;
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const from = accounts[0];

      // Call the enrollFor function on the contract
      contract.methods.enrollFor(username, title)
        .send({ from }, function(err,res){console.log(res)})  //function中的res为方法返回值
        .then(); //该res为交易执行完后的具体交易信息，如TxHash等

      this.props.submitEnrollFor();
    } catch (error) {
      console.error('Failed to connect to Ethereum:', error);
    }
  }

  handleChange = (e) => {
    if (e.target.placeholder === 'Title of Conference')
      this.props.titleChange(e.target.value);
    else
      this.props.usernameChange(e.target.value);
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <input placeholder="Title of Conference" value={this.props.title} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <input placeholder="Username" value={this.props.username} onChange={this.handleChange} />
        </Form.Field>
        <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return (
    {
      title: state.enrollfor.title,
      username: state.enrollfor.username
    }
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitEnrollFor: () => {
      dispatch({
        type: 'submit_enrollfor'
      })
    },

    titleChange: (value) => {
      dispatch({
        type: 'enrollfor_title',
        value: value
      })
    },

    usernameChange: (value) => {
      dispatch({
        type: 'enrollfor_username',
        value: value
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnrollFor)