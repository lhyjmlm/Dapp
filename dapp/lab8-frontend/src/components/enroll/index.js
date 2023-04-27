import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import contract from "../../contracts/contract"

class Enroll extends (Component) {

  handleSubmit = async () => {
    try {
      const { title } = this.props;
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const from = accounts[0];

      // Call the enroll function on the contract
      contract.methods.enroll(title).send({ from })
        .then((res) => console.log(res)); // Log the transaction information

      this.props.submitEnroll();
    } catch (error) {
      console.error('Failed to connect to Ethereum:', error);
    }
  }

  handleChange = (e) => {
    this.props.titleChange(e.target.value);
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <input placeholder="Title of Conference" value={this.props.title} onChange={this.handleChange} />
        </Form.Field>
        <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.enroll.title,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitEnroll: () => {
      dispatch({
        type: 'submit_enroll'
      })
    },
    titleChange: (value) => {
      dispatch({
        type: 'enroll_title',
        value: value
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Enroll)